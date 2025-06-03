// Remove custom layers
const removeCustomLayers = (mapObj) => {
  const allLayers = mapObj.getStyle().layers;
  allLayers.forEach((layer) => {
    if (layer.id.startsWith("custom-layer")) {
      mapObj.removeLayer(layer.id);
    }
  });
  // Remove sources
  const allSources = Object.keys(mapObj.getStyle().sources);
  allSources.forEach((sourceId) => {
    if (sourceId.startsWith("custom-source")) {
      mapObj.removeSource(sourceId);
    }
    return;
  });
};

export default removeCustomLayers;
