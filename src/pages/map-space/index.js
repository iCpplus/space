import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import getMarkIcon from 'utils/getMarkIcon';
import './index.css'

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                type: 'love',
                'message': 'Foo',
                'iconSize': [30, 30]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [108.94226774033302, 34.26107578232728]
            }
        },
    ]
};

function MapSpace() {
    useEffect(() => {
        mapboxgl.accessToken = `pk.eyJ1IjoiYW55c2NyaXB0IiwiYSI6ImNsaGE1dnBnaTBlYzQzZm51bHJybGhnYXgifQ.NbDgFlm8VttYCgacUezBcw`
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/anyscript/clha7tez0000t01rf6r143i40',
            center: [113.65, 34.73],
            zoom: 2,
            projection: 'globe'
        });

        // const marker = new mapboxgl.Marker()
        //     .setLngLat([113.65, 34.73])
        //     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
        //     .addTo(map);

        geojson.features.forEach(marker => {
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            const { type } = marker.properties
            el.className = 'marker';
            el.style.backgroundImage = `url(${getMarkIcon(type)})`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates).setPopup(new mapboxgl.Popup().setHTML(`<div class='${type}-popup'><div class='title'>相遇</div><div class='content'>我们在西安相遇...</div></div>`))
                .addTo(map);
        })

    }, [])
    return (
        <div id='map' style={{ width: '100vw', height: '100vh' }} />
    )
}

export default MapSpace