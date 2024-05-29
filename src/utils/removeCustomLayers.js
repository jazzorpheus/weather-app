// Remove custom layers
const removeCustomLayers = (mapObj) => {
  const allLayers = mapObj.getStyle().layers;
  allLayers.forEach((layer) => {
    if (layer.id.startsWith("custom-layer")) {
      // console.log(`REMOVING ${layer.id} LAYER`);
      mapObj.removeLayer(layer.id);
    }
  });
  // Remove sources
  const allSources = Object.keys(mapObj.getStyle().sources);
  allSources.forEach((sourceId) => {
    if (sourceId.startsWith("custom-source")) {
      // console.log(`REMOVING ${sourceId} SOURCE`);
      mapObj.removeSource(sourceId);
    }
    return;
  });
};

export default removeCustomLayers;
