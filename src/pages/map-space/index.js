import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import getMarkIcon from 'utils/getMarkIcon';
import antiShake from 'utils/antiShake';
import getGoneProvince from '../../utils/map-space/getGoneProvince';
import './index.css'

const provinceData = require('../../assets/map-space/geojson/china.json');

console.log(provinceData);
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                type: 'love',
                iconSize: [30, 30],
                title: '相遇',
                content: '我们在西安相遇，放大来看看我们在西安的足迹吧...',
                time: '2022-02-12',
                defaultShow: true
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [108.94226774033302, 34.26107578232728]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                type: 'college',
                iconSize: [25, 25],
                title: '我的大学',
                content: '在中原工学院的四年大学生活...',
                time: '2018-2022'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [113.68063825590639, 34.58648842000761]
            }
        },
    ]
};

function MapSpace() {

    const map = useRef()
    const antiShakeFn = useRef({})


    useEffect(() => {
        mapboxgl.accessToken = `pk.eyJ1IjoiYW55c2NyaXB0IiwiYSI6ImNsaGE1dnBnaTBlYzQzZm51bHJybGhnYXgifQ.NbDgFlm8VttYCgacUezBcw`
        map.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/anyscript/clha7tez0000t01rf6r143i40',
            center: [113.65, 34.73],
            zoom: 2,
            projection: 'globe'
        });

        // const marker = new mapboxgl.Marker()
        //     .setLngLat([113.65, 34.73])
        //     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
        //     .addTo(map.current);

        geojson.features.forEach(marker => {
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            const { type, title, content, time, defaultShow } = marker.properties
            el.className = 'marker';
            el.style.backgroundImage = `url(${getMarkIcon(type)})`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            // Add markers to the map.current.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates).setPopup(new mapboxgl.Popup().setHTML(`<div class='${type}-popup'><div class='title'>${title}</div><div class='content'>${content}</div><div class='time'>${time}</div></div>`))
                .addTo(map.current);
            if (defaultShow) {
                new mapboxgl.Popup()
                    .setLngLat(marker.geometry.coordinates)
                    .setHTML(`<div class='${type}-popup'><div class='title'>${title}</div><div class='content'>${content}</div><div class='time'>${time}</div></div>`)
                    .addTo(map.current);
            }

        })


        map.current.on('load', () => {
            map.current.addSource('provinces', {
                type: 'geojson',
                data: provinceData
            });

            map.current.addLayer({
                'id': 'provinces-layer',
                'type': 'fill',
                'source': 'provinces', // reference the data source
                'layout': {},
            });
            getGoneProvince(map.current)
            antiShakeFn.current.antiShakeGetGoneProvince = antiShake((e) => getGoneProvince(e), 500)
        })

        map.current.on('zoom', function () {
            antiShakeFn.current.antiShakeGetGoneProvince(map.current)
        });



    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div id='map' style={{ width: '100%', height: '100%' }} />
        </div>

    )
}

export default MapSpace