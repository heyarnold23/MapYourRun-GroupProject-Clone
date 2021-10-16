import React, {useEffect, useState, useRef} from "react"
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./CreateRoute.css"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { setRuns } from '../../store/runs';
import {useLocation} from "react-router-dom"
import { editRun } from "../../store/runs";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { addModal, toggleModalView } from "../../store/session";
import FormModal from "../Modal";
/* eslint import/no-webpack-loader-syntax: off */
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker

const CreateRoute = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [startPoint,updateStartPoint] = useState("")
    const [endPoint,updateEndPoint] = useState("")
    const [distance,setDistance] = useState("")
    const [time,setTime] = useState("")
    const [formFilled,toggleFormFilled] = useState(false)
    const currentUser = useSelector(state=>state.session.user)

    const [isLoaded, setIsLoaded] = useState(false);
    const modalType= useSelector((state)=>state.session.modalType)
    const modalView = useSelector(state => state.session.modalView)
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVuYmFybmV0dDEiLCJhIjoiY2t0a2w1bDh1MW13cjJvbnh2Nm4xeHg4ZSJ9.tfF8CCQtdVQSCHxliRtaQQ';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState("");
    const [lat, setLat] = useState("");
    const [zoom, setZoom] = useState(9);
    const [data,setData] = useState("")



    console.log("LOCATION STATE OUTER ",location.state)
    useEffect(()=>{
        dispatch(addModal("loading"))
        dispatch(toggleModalView(true))
        console.log("LOCATION STATE INNER ",location.state)
        if(!location.state)return
        setData(location.state)
        console.log("STATE INNER",data)
    },[])
    console.log("STATE OUTER",data)
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            updateStartPoint(`${position.coords.latitude},${position.coords.longitude}`)
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        });

    },[])


    const screenshot = () => {
        return map.current.getCanvas().toDataURL("image/png",1.0);
    }

    const fly = () => {

        let [startLat,startLong] = startPoint.split(",").map(x=>Number(x))
        let [endLat,endLong] = endPoint.split(",").map(x=>Number(x))
        let finalLat = (startLat+endLat)/2
        let finalLong = (startLong+endLong)/2
        //if latitude is greater, it means more north
        //if longitude greater, it means more east.
        let maxLat = Math.max(startLat,endLat)
        let maxLong = Math.max(startLong,endLong)

        let minLat = Math.min(startLat,endLat)
        let minLong = Math.min(startLong,endLong)

        // let northEast = [maxLat+0.1,maxLong+0.1]
        // let southWest = [minLat-0.1,minLong-0.1]
        let northEast = [maxLat+0.002,maxLong+0.002]
        let southWest = [minLat-0.002,minLong-0.002]

        if(maxLat && maxLong && minLat && minLong){
                map.current.fitBounds([
                northEast, // southwestern corner of the bounds
                southWest // northeastern corner of the bounds
            ])
        }


    }

    const onSubmit = (e) => {
        const image = screenshot()
        if(startPoint && endPoint && distance && time && image && currentUser){
            if(data){
                dispatch(editRun(data.id,currentUser.id,startPoint,endPoint,distance,time,image))
            }
            else{
                dispatch(setRuns(currentUser.id,startPoint,endPoint,distance,time,image))
            }
        }


    }

        useEffect(() => {
            if (map.current) return; // initialize map only once
            if(lng && lat){
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [lng, lat],
                    zoom: zoom,
                    preserveDrawingBuffer: true
                });
                map.current.directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'imperial',
                    profile: 'mapbox/walking'
                  });
                  map.current.addControl(map.current.directions, 'top-left');
                setIsLoaded(true)
                map.current.directions.on("route", e => {
                    // routes is an array of route objects as documented here:
                    // https://docs.mapbox.com/api/navigation/#route-object
                    let routes = e.route

                    let distance = routes.map(r => r.distance) * 0.621371 / 1000;
                    console.log("distance: ",distance)
                    updateStartPoint(`${map.current.directions.getOrigin().geometry.coordinates[0]},${map.current.directions.getOrigin().geometry.coordinates[1]}`)
                    updateEndPoint(`${map.current.directions.getDestination().geometry.coordinates[0]},${map.current.directions.getDestination().geometry.coordinates[1]}`)
                    setDistance(distance)
                    setTime(distance*60*8)

                })

        }
        });

        useEffect(()=>{
            if(isLoaded){
                dispatch(toggleModalView(false))
            }
        },[isLoaded])
        useEffect(()=>{
            if(startPoint && endPoint && distance && time){
                toggleFormFilled(true)
                fly()
            } else toggleFormFilled(false)
        },[startPoint,endPoint,time,distance])


        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        });

        return (

            <div id = "create-route-page">
                {formFilled && (
                <form onSubmit={onSubmit}>
                    {data ? (
                        <button id = "create-route-submit" type="submit">Edit Run</button>
                    ) : (
                        <button id = "create-route-submit" type="submit">Create Run</button>
                    )}

                </form>
                )}
                <div ref={mapContainer} className="map-container" />
                {modalView ? (<FormModal/>):null}
            </div>

        )
}

export default CreateRoute
