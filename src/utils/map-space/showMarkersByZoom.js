const showMarkersByZoom = (map, markers) => {

    if (!map) return

    const zoom = map.getZoom();

    markers.forEach(marker => {
        // const markerId = marker.getElement().id
        // const layer = map.getLayer(markerId)
        if (marker.minZoom <= zoom && marker.maxZoom >= zoom) {
            marker.addTo(map)
        } else {
            marker.remove()
        }
    })

}

export default showMarkersByZoom;