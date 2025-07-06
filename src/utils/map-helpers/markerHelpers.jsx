import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import CustomMarker from "../../components/CustomMarker";

/**
 * Creates a new marker with custom weather icon
 * @param {Object} weatherData - Current weather data
 * @param {React.Component} weatherIcon - Weather icon component
 * @param {Array} coords - [lng, lat] coordinates
 * @param {Object} mapObj - Mapbox map instance
 * @param {Object} existingMarker - Current marker to remove
 * @returns {Object} New marker instance
 */
export const createMarker = (
  weatherData,
  weatherIcon,
  coords,
  mapObj,
  existingMarker
) => {
  // Remove existing marker if present
  if (existingMarker) {
    existingMarker.remove();
  }

  // Create marker container
  const markerContainer = document.createElement("div");

  // Render custom marker component
  ReactDOM.createRoot(markerContainer).render(
    <CustomMarker data={weatherData} icon={weatherIcon} />
  );

  // Create and return new marker
  return new mapboxgl.Marker(markerContainer).setLngLat(coords).addTo(mapObj);
};

/**
 * Updates marker position
 * @param {Object} marker - Marker instance
 * @param {Array} coords - New [lng, lat] coordinates
 */
export const updateMarkerPosition = (marker, coords) => {
  if (marker) {
    marker.setLngLat(coords);
  }
};
