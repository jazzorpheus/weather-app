// ! DEPRECATED
// // Tomorrow API
// const TMW_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";
// const TIMESTAMP = new Date().toISOString();

// Open Weather Map Key
const OPEN_WEATHER_KEY = "ff325cbc53fd8a64b302d2866b804fc8";

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
        `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_KEY}`,
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openweathermap.org">Powered by Open Weather Map</a>',
    });
    // Add layer
    // console.log(`ADDING NEW custom-layer-${layer} LAYER`);
    mapObj.addLayer({
      id: `custom-layer-${layer}`,
      type: "raster",
      source: `custom-source-${layer}`,
      minzoom: 1,
      maxzoom: 12,
      // paint: {
      //   "raster-opacity": 0.6,
      // },
    });
    mapObj.setPaintProperty(`custom-layer-${layer}`, "raster-opacity", 0.75);
    mapObj.setPaintProperty(
      `custom-layer-${layer}`,
      "raster-brightness-max",
      0.8
    ); // Increase brightness
    mapObj.setPaintProperty(`custom-layer-${layer}`, "raster-saturation", 1); // Increase saturation
  }
};

export default addCurrentLayer;

// `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${layer}/${TIMESTAMP}.png?apikey=${TMW_KEY}`,
