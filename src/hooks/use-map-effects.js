import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateMarker } from "../store";
import { createMarker } from "../utils/map-helpers/markerHelpers";
import { handleLayerChange } from "../utils/map-helpers/layerHelpers";
import getWeatherIcon from "../utils/style-helpers/getWeatherIcon";

/**
 * Custom hook to handle map side effects
 * @param {Object} mapObj - Mapbox map instance
 * @param {Object} currentWeather - Current weather data
 * @param {Array} coords - Coordinates
 * @param {string} layer - Current layer
 * @param {string} prevLayer - Previous layer
 * @param {Object} marker - Current marker
 */
const useMapEffects = (
  mapObj,
  currentWeather,
  coords,
  layer,
  prevLayer,
  marker
) => {
  const dispatch = useDispatch();

  // Initialize map features on load
  useEffect(() => {
    if (!mapObj) return;

    const initializeMapFeatures = () => {
      // Add initial layer
      if (layer !== "none") {
        handleLayerChange(layer, null, mapObj);
      }

      // Add initial marker
      if (currentWeather.data) {
        const weatherIcon = getWeatherIcon(currentWeather.data);
        const newMarker = createMarker(
          currentWeather.data,
          weatherIcon,
          coords,
          mapObj,
          marker
        );
        dispatch(updateMarker(newMarker));
      }
    };

    if (mapObj.loaded()) {
      initializeMapFeatures();
    } else {
      mapObj.once("style.load", initializeMapFeatures);
    }
  }, [mapObj]);

  // Handle layer updates
  useEffect(() => {
    if (mapObj && mapObj.loaded() && prevLayer !== null) {
      handleLayerChange(layer, prevLayer, mapObj);
    }
  }, [layer, prevLayer, mapObj]);

  // Handle marker updates when weather data changes
  const updateMapMarker = useCallback(() => {
    if (!mapObj || !currentWeather.data) return;

    const weatherIcon = getWeatherIcon(currentWeather.data);
    const newMarker = createMarker(
      currentWeather.data,
      weatherIcon,
      coords,
      mapObj,
      marker
    );
    dispatch(updateMarker(newMarker));
  }, [mapObj, currentWeather.data, coords, marker, dispatch]);

  useEffect(() => {
    updateMapMarker();
  }, [currentWeather.data]);
};

export default useMapEffects;
