const zoomThreshold = 3.7;

/**
 * Highlights the provinces the author has lived in while zoomed out, and hides
 * the layer once the user zooms into city level.
 */
const showGoneProvinceByZoom = (map) => {
    if (!map) return;

    const zoom = map.getZoom();

    if (zoom <= zoomThreshold) {
        map.setFilter('provinces-layer', ['in', 'name', '河南省', '陕西省', '四川省']);
        map.setPaintProperty('provinces-layer', 'fill-color', 'rgba(97, 201, 255,0.2)');
    } else {
        map.setFilter('provinces-layer', ['==', 'name', '***']);
    }
};

export default showGoneProvinceByZoom;
