import { NavLink } from 'react-router-dom';
import React, {useEffect, useState, useRef} from "react"
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./CreateRoute.css"
import { getData } from '../../store/geocoding';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


const CreateRoute = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [startPoint,updateStartPoint] = useState("")
    const [endPoint,updateEndPoint] = useState("")
    const [forwardUrl,setForwardUrl] = useState("http://api.positionstack.com/v1/forward?access_key=cedc0a3a23e77435267edf0f1c4f9c66&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC")
    const [reverseUrl,setReverseUrl] = useState("http://api.positionstack.com/v1/forward?access_key=cedc0a3a23e77435267edf0f1c4f9c66&query=40.7638435,-73.9729691")

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVuYmFybmV0dDEiLCJhIjoiY2t0a2w1bDh1MW13cjJvbnh2Nm4xeHg4ZSJ9.tfF8CCQtdVQSCHxliRtaQQ';

    const mapContainer = useRef(null);
    const map = useRef(null);
    let marker = useRef(null)
    const [lng, setLng] = useState("");
    const [lat, setLat] = useState("");
    const [zoom, setZoom] = useState(9);
    const [markerCount,setMarkerCount] = useState(0)


    const markerCreator = (e) => {

        let coordinates = e.lngLat;
        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map.current);
        setMarkerCount(markerCount=>markerCount+1)
        console.log(e.lngLat)
        updateEndPoint(`${e.lngLat.lat},${e.lngLat.lng}`)
    }


    useEffect(()=>{
        if(markerCount === 2){
            const geojson = {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "LineString",
                    "coordinates": []
                  }
                }]
              };

        }

    },[markerCount])

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            updateStartPoint(`${position.coords.latitude},${position.coords.longitude}`)
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
            console.log("position set")
        });

    },[])

        useEffect(() => {
            if (map.current) return; // initialize map only once
            if(lng && lat){
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [lng, lat],
                    zoom: zoom
                });
                map.current.directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving'
                  });
                  map.current.addControl(map.current.directions, 'top-left');

                marker = new mapboxgl.Marker() //create new marker
                .setLngLat([lng, lat])
                    .addTo(map.current);

                setMarkerCount(markerCount=>markerCount+1)


        }
        });

        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        });

        useEffect(()=>{
            if (!map.current || markerCount > 2) {
                return; // wait for map to initialize
            }

            map.current.off("click",markerCreator)
            map.current.on('style.load', () => {
                map.current.once('click', markerCreator);
            });


        },[markerCount])

        // useEffect(()=>{
        //     dispatch(getData(forwardUrl))
        // },[])

        let data = useSelector(state=>{
            if(state.geocoding) return state.geocoding.data
        })
        // console.log("Geocoding Data: ",data)
        useEffect(()=>{

        },[])



        return (
            <div id = "create-route-page">
                <div id = "map-outer-container">
                    <div ref={mapContainer} className="map-container" />
                </div>
            </div>

        )
}

export default CreateRoute
