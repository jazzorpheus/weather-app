// Open Weather Map Key
const OPEN_WEATHER_KEY = "ff325cbc53fd8a64b302d2866b804fc8";

// Add current layer
const addCurrentLayer = (layer, mapObj) => {
  // Check whether source & layer already exist
  const allSources = Object.keys(mapObj.getStyle().sources);
  if (!allSources.some((source) => source === `custom-source-${layer}`)) {
    // Add source
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
    mapObj.addLayer({
      id: `custom-layer-${layer}`,
      type: "raster",
      source: `custom-source-${layer}`,
      minzoom: 1,
      maxzoom: 12,
      paint: {
        "raster-opacity": 0.5,
        "raster-saturation": 0.98,
      },
    });
    if (layer === "pressure_new" || layer === "temp_new") {
      mapObj.setPaintProperty(
        `custom-layer-${layer}`,
        "raster-saturation",
        0.8
      );
    } else if (layer === "wind_new") {
      mapObj.setPaintProperty(
        `custom-layer-${layer}`,
        "raster-saturation",
        0.98
      );
    }
  }
};

export default addCurrentLayer;
