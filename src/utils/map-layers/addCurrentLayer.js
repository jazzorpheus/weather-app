import { LAYER_PAINT_CONFIG } from "../../config/mapConfig";

// Open Weather Map Key
const OPEN_WEATHER_KEY = "ff325cbc53fd8a64b302d2866b804fc8";

/**
 * Adds a weather layer to the map
 * @param {string} layer - Layer type to add
 * @param {Object} mapObj - Mapbox map instance
 */
const addCurrentLayer = (layer, mapObj) => {
  // Check if source already exists
  const sourceId = `custom-source-${layer}`;
  const layerId = `custom-layer-${layer}`;

  if (mapObj.getSource(sourceId)) {
    return; // Layer already exists
  }

  // Add source
  mapObj.addSource(sourceId, {
    type: "raster",
    tiles: [
      `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_KEY}`,
    ],
    tileSize: 256,
    attribution:
      '&copy; <a href="https://www.openweathermap.org">Powered by Open Weather Map</a>',
  });

  // Get paint properties for this layer type
  const paintProperties =
    LAYER_PAINT_CONFIG[layer] || LAYER_PAINT_CONFIG.default;

  // Add layer with appropriate paint properties
  mapObj.addLayer({
    id: layerId,
    type: "raster",
    source: sourceId,
    minzoom: 1,
    maxzoom: 12,
    paint: paintProperties,
  });
};

export default addCurrentLayer;
