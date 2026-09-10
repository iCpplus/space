import React, { useCallback, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import antiShake from 'utils/antiShake';
import withBasePath from 'utils/basePath';
import allMarkers from 'lib/map-space/markers';
import getMarkers from 'lib/map-space/getMarkers';
import showDefaultPopup from 'lib/map-space/showDefaultPopup';
import showGoneProvinceByZoom from 'lib/map-space/showGoneProvinceByZoom';
import showMarkersByZoom from 'lib/map-space/showMarkersByZoom';

// The token is injected at build time and deliberately **not** committed: GitHub
// push protection rejects any commit containing `NEXT_PUBLIC_MAPBOX_TOKEN`
// (`GH013: Push cannot contain secrets`), even though `pk.*` is a public token.
// Locally it comes from `.env`; on CI from an Actions variable/secret.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const PROVINCE_GEOJSON_URL = withBasePath('/map-space/geojson/china.json');

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

        map.on('error', (event) => {
            // Deliberately no UI fallback: if the token or the external style is
            // broken the page stays blank, which is more obvious than a
            // half-styled placeholder.
            console.error('[map-space] mapbox error', event && event.error ? event.error : event);
        });
    }, []);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
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
            } catch (err) {
                console.error('[map-space] failed to initialise mapbox', err);
            }
        };

        load();

        return () => {
            cancelled = true;
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
            <div id="map" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default MapSpace;
