const zoomThreshold = 3.7

const getGoneProvince = (map) => {

    if (!map) return

    const zoom = map.getZoom && map.getZoom();
    console.log(zoom);
    if (zoom <= zoomThreshold) {
        map.setFilter && map.setFilter('provinces-layer', ['in', 'name', '河南省', '陕西省']);
        map.setPaintProperty && map.setPaintProperty('provinces-layer', 'fill-color', '#005fb8', 0.2);
    } else {
        map.setFilter && map.setFilter('provinces-layer', ['==', 'name', '***',]);
    }

}

export default getGoneProvince;