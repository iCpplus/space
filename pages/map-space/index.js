import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import antiShake from 'utils/antiShake';
import withBasePath from 'utils/basePath';
import allMarkers from 'lib/map-space/markers';
import getMarkers from 'lib/map-space/getMarkers';
import showDefaultPopup from 'lib/map-space/showDefaultPopup';
import showGoneProvinceByZoom from 'lib/map-space/showGoneProvinceByZoom';
import showMarkersByZoom from 'lib/map-space/showMarkersByZoom';

// Mapbox 公共 token 通过环境变量注入（见 .env.example / .env.local），
// 避免把 token 硬编码进仓库（GitHub push protection 会拦截）。
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const PROVINCE_GEOJSON_URL = withBasePath('/map-space/geojson/china.json');
const LOAD_TIMEOUT = 12000;

function MapFallback() {
    return (
        <main className="map-space-fallback">
            <header>
                <p className="map-space-eyebrow">ANYSPACE / SPACE</p>
                <h1>我的足迹</h1>
                <p>地图服务暂时不可用，先从这里查看我生活和旅行经过的地方。</p>
            </header>
            <div className="map-space-places">
                {allMarkers.features.map((marker) => {
                    const { title, content, time } = marker.properties;
                    const [longitude, latitude] = marker.geometry.coordinates;
                    const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;

                    return (
                        <article key={title} className={`map-space-place ${marker.properties.type}-place`}>
                            <div>
                                <h2>{title}</h2>
                                <p>{content}</p>
                                <time>{time}</time>
                            </div>
                            <a href={mapUrl} target="_blank" rel="noreferrer">
                                查看地图
                            </a>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}

/**
 * Full screen Mapbox globe showing the places the author has lived / travelled.
 * Ported from the original Gatsby `src/pages/map-space/index.js`.
 *
 * `mapbox-gl` is imported dynamically so it never runs during SSR.
 */
function MapSpace() {
    const mapRef = useRef(null);
    const antiShakeFn = useRef({});
    const markersRef = useRef([]);
    const [status, setStatus] = useState('loading');

    const initMapSpace = useCallback((mapboxgl, provinceGeoJson) => {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        mapRef.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/anyscript/clha7tez0000t01rf6r143i40',
            center: [113.65, 34.73],
            zoom: 2,
            projection: 'globe',
        });

        const map = mapRef.current;

        map.on('load', () => {
            setStatus('ready');

            map.addSource('provinces', {
                type: 'geojson',
                data: provinceGeoJson,
            });

            map.addLayer({
                id: 'provinces-layer',
                type: 'fill',
                source: 'provinces',
                layout: {},
            });

            showGoneProvinceByZoom(map);
            antiShakeFn.current.antiShakeShowGoneProvinceByZoom = antiShake(
                (e) => showGoneProvinceByZoom(e),
                500,
            );

            markersRef.current = getMarkers(mapboxgl, allMarkers);
            showDefaultPopup(mapboxgl, map, allMarkers);
            showMarkersByZoom(map, markersRef.current);

            antiShakeFn.current.antiShakeShowMarkersByZoom = antiShake(
                (e, f) => showMarkersByZoom(e, f),
                500,
            );
        });

        map.on('zoom', () => {
            const { antiShakeShowGoneProvinceByZoom, antiShakeShowMarkersByZoom } = antiShakeFn.current;
            if (antiShakeShowGoneProvinceByZoom) antiShakeShowGoneProvinceByZoom(map);
            if (antiShakeShowMarkersByZoom) antiShakeShowMarkersByZoom(map, markersRef.current);
        });

        map.on('error', () => {
            setStatus((prev) => (prev === 'ready' ? prev : 'error'));
        });
    }, []);

    useEffect(() => {
        let cancelled = false;
        let timeoutId;

        const load = async () => {
            if (!MAPBOX_TOKEN) {
                setStatus('no-token');
                return;
            }

            try {
                const mod = await import('mapbox-gl');
                const mapboxgl = mod.default || mod;

                let provinceGeoJson = { type: 'FeatureCollection', features: [] };
                try {
                    const res = await fetch(PROVINCE_GEOJSON_URL);
                    if (res.ok) provinceGeoJson = await res.json();
                } catch (err) {
                    /* the province highlight is optional */
                }

                if (cancelled) return;
                initMapSpace(mapboxgl, provinceGeoJson);

                timeoutId = setTimeout(() => {
                    setStatus((prev) => (prev === 'ready' ? prev : 'error'));
                }, LOAD_TIMEOUT);
            } catch (err) {
                if (!cancelled) setStatus('error');
            }
        };

        load();

        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [initMapSpace]);

    return (
        <div
            className="map-space-page"
            style={{ width: '100vw', height: '100vh', position: 'relative' }}
        >
            {status === 'no-token' ? <MapFallback /> : <div id="map" style={{ width: '100%', height: '100%' }} />}
            {status !== 'ready' && status !== 'no-token' && (
                <div className="map-space-status">
                    {status === 'loading' && '地图加载中…'}
                    {status === 'error' && '地图资源加载失败，需要联网访问 Mapbox'}
                    {status === 'no-token' && '未配置 NEXT_PUBLIC_MAPBOX_TOKEN，地图不可用'}
                </div>
            )}
        </div>
    );
}

export default MapSpace;
