import React, { useCallback, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import antiShake from 'utils/antiShake';
import showGoneProvinceByZoom from 'utils/map-space/showGoneProvinceByZoom';
import showDefaultPopup from 'utils/map-space/showDefaultPopup';
import showMarkersByZoom from 'utils/map-space/showMarkersByZoom';
import getMarkers from 'utils/map-space/getMarkers';
import './index.css'

const provinceData = require('../../assets/map-space/geojson/china.json');

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function MapSpace() {
    const map = useRef()
    const antiShakeFn = useRef({})
    const markers = useRef([])
    const initMapSpace = (geojson) => {
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
            showDefaultPopup(map.current, geojson)
            showMarkersByZoom(map.current, markers.current)
            antiShakeFn.current.antiShakeShowMarkersByZoom = antiShake((e, f) => showMarkersByZoom(e, f), 500)


        })

        map.current.on('zoom', function () {
            antiShakeFn.current.antiShakeShowGoneProvinceByZoom(map.current)
            antiShakeFn.current.antiShakeShowMarkersByZoom(map.current, markers.current)
        });
    }
    const getAllMarkers = useCallback(async () => {
        const res = await fetch('https://space-server-chi.vercel.app/markers')
        const geojson = await res.json()
        initMapSpace(geojson)
    }, [])

    useEffect(() => {
        getAllMarkers()
    }, [getAllMarkers])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div id='map' style={{ width: '100%', height: '100%' }} />
        </div>

    )
}

export default MapSpace