/**
 * Shows each marker only within its configured zoom range.
 */
const showMarkersByZoom = (map, markers) => {
    if (!map) return;

    const zoom = map.getZoom();

    markers.forEach((marker) => {
        if (marker.minZoom <= zoom && marker.maxZoom >= zoom) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    });
};

export default showMarkersByZoom;
