import getMarkIcon from './getMarkIcon';

/**
 * Builds the mapbox markers for every feature. `mapboxgl` is passed in so this
 * module stays importable on the server (mapbox-gl is loaded client-side only).
 */
const getMarkers = (mapboxgl, geojson) => {
    const markers = [];

    geojson.features.forEach((marker) => {
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        const { type, title, content, time, defaultShow, minZoom, maxZoom, images } =
            marker.properties;
        el.className = 'marker';
        el.style.backgroundImage = `url(${getMarkIcon(type)})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        let imageElements = '';
        const imgUrls = images.split(',');
        if (imgUrls.length !== 1) {
            imgUrls.forEach((item) => {
                imageElements += `<a href='${item}' target='_blank'><img style='width:106px;height:106px' src='${item}' /></a>`;
            });
        } else if (imgUrls[0]) {
            imageElements = `<a target='_blank' href='${imgUrls[0]}'><img style='width:212px;height:212px' src='${imgUrls[0]}' /></a>`;
        }

        const m = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup().setHTML(
                    `<div class='${type}-popup'><div class='title'>${title}</div><div class='content'><div>${content}</div><div class='images'>${imageElements}</div></div><div class='time'>${time}</div></div>`,
                ),
            );
        m.minZoom = minZoom;
        m.maxZoom = maxZoom;
        m.defaultShow = defaultShow;
        markers.push(m);
    });

    return markers;
};

export default getMarkers;
