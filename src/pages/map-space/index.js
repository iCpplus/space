import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import antiShake from 'utils/antiShake';
import showGoneProvinceByZoom from 'utils/map-space/showGoneProvinceByZoom';
import showDefaultPopup from 'utils/map-space/showDefaultPopup';
import showMarkersByZoom from 'utils/map-space/showMarkersByZoom';
import getMarkers from 'utils/map-space/getMarkers';
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
                defaultShow: true,
                minZoom: 0,
                maxZoom: 9,
                images:'https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg'
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
                time: '2018-2022',
                minZoom: 0,
                maxZoom: 9,
                images:'https://img.picgo.net/2023/05/10/107956067_p0_master12007095a4d2bf91b5ca.jpeg'
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
    const markers = useRef([])

    useEffect(() => {
        mapboxgl.accessToken = `pk.eyJ1IjoiYW55c2NyaXB0IiwiYSI6ImNsaGE1dnBnaTBlYzQzZm51bHJybGhnYXgifQ.NbDgFlm8VttYCgacUezBcw`
        map.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/anyscript/clha7tez0000t01rf6r143i40',
            center: [113.65, 34.73],
            zoom: 2,
            projection: 'globe'
        });



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
            showGoneProvinceByZoom(map.current)
            antiShakeFn.current.antiShakeShowGoneProvinceByZoom = antiShake((e) => showGoneProvinceByZoom(e), 500)
            markers.current = getMarkers(geojson)
            showDefaultPopup(map.current,geojson)
            showMarkersByZoom(map.current,markers.current)
            antiShakeFn.current.antiShakeShowMarkersByZoom = antiShake((e,f) => showMarkersByZoom(e,f), 500)


        })

        map.current.on('zoom', function () {
            antiShakeFn.current.antiShakeShowGoneProvinceByZoom(map.current)
            antiShakeFn.current.antiShakeShowMarkersByZoom (map.current, markers.current)
        });
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div id='map' style={{ width: '100%', height: '100%' }} />
        </div>

    )
}

export default MapSpace