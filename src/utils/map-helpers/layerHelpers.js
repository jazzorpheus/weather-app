import addCurrentLayer from "../map-layers/addCurrentLayer";
import removeCustomLayers from "../map-layers/removeCustomLayers";

/**
 * Handles layer changes on the map
 * @param {string} currentLayer - Current layer to add
 * @param {string} previousLayer - Previous layer to remove
 * @param {Object} mapObj - Mapbox map instance
 */
export const handleLayerChange = (currentLayer, previousLayer, mapObj) => {
  if (!mapObj) return;

  // Remove previous layers if they exist
  if (previousLayer) {
    removeCustomLayers(mapObj);
  }

  // Add new layer if it's not 'none'
  if (currentLayer && currentLayer !== "none") {
    addCurrentLayer(currentLayer, mapObj);
  }
};

/**
 * Sets up layer after style change
 * @param {string} layer - Layer to add
 * @param {Object} mapObj - Mapbox map instance
 * @returns {Promise} Promise that resolves when layer is added
 */
export const setupLayerAfterStyleChange = (layer, mapObj) => {
  return new Promise((resolve) => {
    if (mapObj && layer !== "none") {
      mapObj.once("style.load", () => {
        addCurrentLayer(layer, mapObj);
        resolve();
      });
    } else {
      resolve();
    }
  });
};
