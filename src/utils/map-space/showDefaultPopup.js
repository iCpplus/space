import mapboxgl from 'mapbox-gl';
import getMarkIcon from 'utils/getMarkIcon';

const showDefaultPopup = (map, geojson) => {

    if (!map) return

    geojson.features.forEach(marker => {
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        const { type, title, content, time, defaultShow, images } = marker.properties
        el.className = 'marker';
        el.style.backgroundImage = `url(${getMarkIcon(type)})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        if (defaultShow) {
            let imageElements = ''
            images.split(',').forEach(item => {
                imageElements += `<a target='_blank' href='${item}'><img src='${item}' /></a>`
            })

            new mapboxgl.Popup()
                .setLngLat(marker.geometry.coordinates)
                .setHTML(`<div class='${type}-popup'><div class='title'>${title}</div><div class='content'>${content}</div><div class='images'>${imageElements}</div><div class='time'>${time}</div></div>`)
                .addTo(map);
        }

    })
}

export default showDefaultPopup;
