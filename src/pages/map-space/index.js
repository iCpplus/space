import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl';

function MapSpace() {
    useEffect(() => {
        mapboxgl.accessToken = `pk.eyJ1IjoiYW55c2NyaXB0IiwiYSI6ImNsaGE1dnBnaTBlYzQzZm51bHJybGhnYXgifQ.NbDgFlm8VttYCgacUezBcw`
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/anyscript/clha6byne011001p6heehgmxa',
            center: [113.65, 34.73],
            zoom: 4.5,
            projection: 'globe' 
        });

    }, [])
    return (
        <div id='map' style={{width:'100vw',height:'100vh'}} />
    )
}

export default MapSpace