// Tomorrow API
const TMW_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";
const TIMESTAMP = new Date().toISOString();

// Add current layer
const addCurrentLayer = (layer, mapObj) => {
  // Check whether source & layer already exist
  const allSources = Object.keys(mapObj.getStyle().sources);
  if (!allSources.some((source) => source === `custom-source-${layer}`)) {
    // Add source
    // console.log(`ADDING NEW custom-source-${layer} SOURCE`);
    mapObj.addSource(`custom-source-${layer}`, {
      type: "raster",
      tiles: [
        `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${layer}/${TIMESTAMP}.png?apikey=${TMW_KEY}`,
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
    });
    // Add layer
    // console.log(`ADDING NEW custom-layer-${layer} LAYER`);
    mapObj.addLayer({
      id: `custom-layer-${layer}`,
      type: "raster",
      source: `custom-source-${layer}`,
      minzoom: 1,
      maxzoom: 12,
      paint: {
        "raster-opacity": 0.65,
      },
    });
  }
};

export default addCurrentLayer;
