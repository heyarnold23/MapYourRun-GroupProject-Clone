import { NavLink } from 'react-router-dom';
import {useEffect, useState, useRef} from "react"
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./CreateRoute.css"
import { getData } from '../../store/geocoding';

const CreateRoute = () => {
    const dispatch = useDispatch()
    const [coordinates,setCoordinates] = useState([[37.7749,-122.4194],[37.3382,-121.8863],[37.8044,-122.2712],[34.4208,-119.6982],[34.0195,-118.4912],[37.6485,-118.9721],[38.5816,-121.4944],[38.9399,-119.9772]])
    const [errors, setErrors] = useState([]);
    const [startPoint,updateStartPoint] = useState("")
    const [endPoint,updateEndPoint] = useState("")
    const [forwardUrl,setForwardUrl] = useState("http://api.positionstack.com/v1/forward?access_key=cedc0a3a23e77435267edf0f1c4f9c66&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC")
    const [reverseUrl,setReverseUrl] = useState("http://api.positionstack.com/v1/forward?access_key=cedc0a3a23e77435267edf0f1c4f9c66&query=40.7638435,-73.9729691")
    let currentCoordinates = coordinates[0]
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVuYmFybmV0dDEiLCJhIjoiY2t0a2w1bDh1MW13cjJvbnh2Nm4xeHg4ZSJ9.tfF8CCQtdVQSCHxliRtaQQ';

    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(currentCoordinates[1]);
        const [lat, setLat] = useState(currentCoordinates[0]);
        const [zoom, setZoom] = useState(9);

        useEffect(() => {
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            });
        });

        useEffect(()=>{
            navigator.geolocation.getCurrentPosition(function(position) {
                updateStartPoint(`${position.coords.latitude},${position.coords.longitude}`)
            });
        },[])

        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        });
        useEffect(()=>{
            dispatch(getData(forwardUrl))

        },[])
        let data = useSelector(state=>{
            if(state.geocoding) return state.geocoding.data
        })
        console.log("Geocoding Data: ",data)




        return (
            <div id = "create-route-page">
                <div id = "left-side">
                    <form >
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div>
                            <label>Start Point</label>
                            <input
                            type='text'
                            name='age'
                            onChange={updateStartPoint}
                            value={startPoint}
                            ></input>
                        </div>
                        <div>
                            <label>End Point</label>
                            <input
                            type='text'
                            name='weight'
                            onChange={updateEndPoint}
                            value={endPoint}
                            ></input>
                        </div>
                        <button type='submit'>Create</button>
                    </form>
                </div>
                <div id = "map-outer-container">
                    <div ref={mapContainer} className="map-inner-container" />
                </div>
            </div>

        )
}

export default CreateRoute
