import { NavLink } from 'react-router-dom';
import {useEffect, useState, useRef} from "react"
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';

const CreateRoute = () => {
    const [coordinates,setCoordinates] = useState([[37.7749,-122.4194],[37.3382,-121.8863],[37.8044,-122.2712],[34.4208,-119.6982],[34.0195,-118.4912],[37.6485,-118.9721],[38.5816,-121.4944],[38.9399,-119.9772]])
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
            console.log(2)
        });
        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });
            console.log(3)
            });

        return (
            <div id = "map-outer-container">
                <div ref={mapContainer} className="map-inner-container" />
                Hello
            </div>
        )
}

export default CreateRoute
