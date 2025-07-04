// React DOM
import ReactDOM from "react-dom/client";

// Mapbox GL
import mapboxgl from "mapbox-gl";

// React
import { useState, useEffect, useRef } from "react";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Action Creator Functions
import {
  updateMapStyle,
  updateLayer,
  updatePrevLayer,
  updateMarker,
} from "../store";

// Custom Hooks
import useCreateMap from "../hooks/use-create-map";
import getWeatherIcon from "../utils/style-helpers/getWeatherIcon";

// Local Components
import Dropdown from "./Dropdown";
import CustomMarker from "./CustomMarker";

// Local Utilities
import addCurrentLayer from "../utils/map-layers/addCurrentLayer";
import removeCustomLayers from "../utils/map-layers/removeCustomLayers";

// @uidotdev/usehooks
// Gives access to variable that counts number of renders
import { useRenderCount } from "@uidotdev/usehooks";

// List of style options
const styleOptions = [
  { label: "Dark", value: "dark-v11" },
  { label: "Light", value: "light-v11" },
  { label: "Outdoors", value: "outdoors-v12" },
  { label: "Satellite", value: "satellite-streets-v12" },
  { label: "Streets", value: "streets-v12" },
];

// List of layer options (OpenWeatherMap)
const layerOptions = [
  { label: "Cloud Cover", value: "clouds_new" },
  { label: "Precipitation", value: "precipitation_new" },
  { label: "Pressure (sea)", value: "pressure_new" },
  { label: "Temperature", value: "temp_new" },
  { label: "Wind Speed", value: "wind_new" },
  { label: "No Layer", value: "none" },
];

// *************************************************************************************  COMPONENT
export default function Map() {
  // ******************************************************** DECLARE STATE, INIT MAP

  // Action dispatch function for updating map style, layer, etc.
  const dispatch = useDispatch();

  // Current coordinates current weather from store
  const { coords } = useSelector((state) => state.coords);
  const currentWeather = useSelector((state) => state.currentWeather);

  // Reference to map HTML element
  const mapContainerRef = useRef();

  // Map object, marker & style from store
  const { mapObj, mapStyle, marker } = useSelector((state) => state.map);

  // Get appropriate weather icon for custom marker
  let weatherIcon = getWeatherIcon(currentWeather.data);

  // Initialize Map
  useCreateMap(mapContainerRef, mapStyle, coords, dispatch);

  // Keep track of total number of renders
  const renderCount = useRenderCount();

  // **********************************************************  CONTROL LAYER

  // Current and previous layers from store
  const { layer, prevLayer } = useSelector((state) => state.map);

  // Selected layer in dropdown
  const [selectedLayer, setSelectedLayer] = useState({
    label: layerOptions.find((option) => option.value === layer).label,
    value: layer,
  });

  // Change map layer selection in dropdown, update map layer
  const handleLayerSelect = (option) => {
    // Set layer option in dropdown
    setSelectedLayer(option);
    // Update layers in store
    dispatch(updatePrevLayer(layer));
    dispatch(updateLayer(option.value));
  };

  // **********************************************************  CONTROL STYLE

  // Selected map style in dropdown
  const [selectedStyle, setSelectedStyle] = useState({
    label: styleOptions.find((option) => option.value === mapStyle).label,
    value: mapStyle,
  });

  // Handle style selection
  const handleStyleSelect = (option) => {
    // Set dropdown style to selected option
    setSelectedStyle(option);
    // Update map style in store
    dispatch(updateMapStyle(option.value));

    // Re-add current layer (if there was one) once new style has loaded
    if (mapObj && layer !== "none") {
      mapObj.once("style.load", () => addCurrentLayer(layer, mapObj));
    }
  };

  // *******************************************************  LAYER & MARKER EFFECTS AFTER INIT

  // Render initial layer & update layer
  useEffect(() => {
    if (mapObj) {
      // Update layer
      if (prevLayer) {
        if (layer !== "none") {
          removeCustomLayers(mapObj);
          addCurrentLayer(layer, mapObj);
        } else {
          removeCustomLayers(mapObj);
        }
      }
    }
  }, [layer]);

  useEffect(() => {
    // Update custom marker
    if (marker) {
      marker.remove();
      const markerContainer = document.createElement("div");
      ReactDOM.createRoot(markerContainer).render(
        <CustomMarker data={currentWeather.data} icon={weatherIcon} />
      );
      dispatch(
        updateMarker(
          new mapboxgl.Marker(markerContainer).setLngLat(coords).addTo(mapObj)
        )
      );
    }
  }, [currentWeather.data]);

  // **********************************************************  INITIALIZE LAYER & MARKER

  // Render initial layer
  if (renderCount === 2) {
    if (layer !== "none") {
      mapObj.once("style.load", () => addCurrentLayer(layer, mapObj));
    }

    // Initialize custom marker
    mapObj.once("style.load", () => {
      if (marker) {
        marker.remove();
      }
      const markerContainer = document.createElement("div");
      ReactDOM.createRoot(markerContainer).render(
        <CustomMarker data={currentWeather.data} icon={weatherIcon} />
      );
      dispatch(
        updateMarker(
          new mapboxgl.Marker(markerContainer).setLngLat(coords).addTo(mapObj)
        )
      );
    });
  }
  return (
    <div className="fixed inset-0">
      <div ref={mapContainerRef} className="map-container w-full h-full z-0" />
      <div className="absolute bottom-20 left-0 w-full px-2 flex flex-wrap justify-start gap-2">
        <Dropdown
          className="w-[130px] min-w-0 flex-shrink"
          label="Map Style"
          options={styleOptions}
          value={selectedStyle}
          onChange={handleStyleSelect}
        />
        <Dropdown
          className="w-[150px] min-w-0 flex-shrink"
          label="Add Layer"
          options={layerOptions}
          value={selectedLayer}
          onChange={handleLayerSelect}
        />
      </div>
    </div>
  );
}
