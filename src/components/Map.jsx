// React
import { useState, useEffect, useRef } from "react";

// React-Redux
import { useDispatch, useSelector } from "react-redux";
// Action Creator Functions
import { updateMapStyle, updateLayer, updatePrevLayer } from "../store";

// Custom Hooks
import useCreateMap from "../hooks/use-create-map";

// My Components
import Dropdown from "./Dropdown";

// Utilities
import addCurrentLayer from "../utils/addCurrentLayer";
import removeCustomLayers from "../utils/removeCustomLayers";

// @uidotdev/usehooks
// Gives access to variable that counts number of renders
import { useRenderCount } from "@uidotdev/usehooks";

// List of styleOptions
const styleOptions = [
  { label: "Dark", value: "dark-v11" },
  { label: "Light", value: "light-v11" },
  { label: "Outdoors", value: "outdoors-v12" },
  { label: "Satellite", value: "satellite-streets-v12" },
  { label: "Streets", value: "streets-v12" },
];

const layerOptions = [
  { label: "Air Quality", value: "mepIndex" },
  { label: "Humidity", value: "humidity" },
  { label: "Precipitation", value: "precipitationIntensity" },
  { label: "Pressure (sea)", value: "pressureSeaLevel" },
  { label: "Pressure (surface)", value: "pressureSurfaceLevel" },
  { label: "Temperature", value: "temperature" },
  { label: "Wind Speed", value: "windSpeed" },
  { label: "No Layer", value: "none" },
];

// *************************************************************************************  COMPONENT
function Map() {
  // ******************************************************** DECLARE STATE, INIT MAP

  // Action dispatch function for updating map style, layer, etc.
  const dispatch = useDispatch();

  // Current coordinates from store
  const { coords } = useSelector((state) => state.coords);
  // Reference to map HTML element
  const mapContainerRef = useRef();
  // Map object & style from store
  const mapObj = useSelector((state) => state.map.mapObj);
  const mapStyle = useSelector((state) => state.map.mapStyle);

  // Initialize Map
  useCreateMap(mapContainerRef, mapStyle, coords, dispatch);

  // Keep track of total number of renders
  const renderCount = useRenderCount();
  //! DEV ONLY
  console.log("RENDER COUNT:", renderCount);

  const layer = useSelector((state) => state.map.layer);
  const prevLayer = useSelector((state) => state.map.prevLayer);
  // Selected layer in dropdown, to display label
  const [selectedLayer, setSelectedLayer] = useState({
    label: layerOptions.find((option) => option.value === layer).label,
    value: layer,
  });

  // Map style
  const [selectedStyle, setSelectedStyle] = useState({
    label: styleOptions.find((option) => option.value === mapStyle).label,
    value: mapStyle,
  });

  // ********************************************************************** ADD/REMOVE LAYER FUNCTIONS ->

  // **********************************************************************  LAYER FUNCTIONS <-

  // **********************************************************  STYLE DROPDOWN CONFIG

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

  // **********************************************************  LAYER DROPDOWN CONFIG

  // Change map layer selection in dropdown, update map layer
  const handleLayerSelect = (option) => {
    setSelectedLayer(option);
    dispatch(updatePrevLayer(layer));
    dispatch(updateLayer(option.value));
  };

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

  // Render initial layer
  if (layer !== "none" && renderCount === 2) {
    // console.log("SETTING FIRST STYLE LOAD LISTENER!");
    mapObj.once("style.load", () => addCurrentLayer(layer, mapObj));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-dvw">
        {/* <div className="sidebar text-white bg-gray-700 ">
          Longitude: {coords[0]} | Latitude: {coords[1]}
        </div> */}
        <div ref={mapContainerRef} className="map-container w-100" />
        <div className="absolute -translate-y-12 translate-x-4">
          <Dropdown
            className="w-[130px]"
            label="Map Style"
            options={styleOptions}
            value={selectedStyle}
            onChange={handleStyleSelect}
          />
        </div>
        <div className="absolute -translate-y-12 translate-x-40">
          <Dropdown
            className="w-[150px]"
            label="Add Layer"
            options={layerOptions}
            value={selectedLayer}
            onChange={handleLayerSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;

//! PREVIOUS DEV TROUBLESHOOTING STUFF

// ****************************************************************  Log all custom SOURCES & LAYERS ->
// try {
//   // Get all sources
//   const sources = Object.values(mapObj.getStyle().sources);
//   console.log("ALL SOURCES:", sources);
//   // Get all layers
//   const layers = mapObj.getStyle().layers;
//   // Filter out custom layers
//   const customLayers = layers.filter(function (layer) {
//     // Check if the layer's ID starts with a specific prefix
//     return layer.id.startsWith("custom-layer");
//   });
//   console.log("CUSTOM LAYERS:", customLayers);
// } catch (err) {
//   console.log(err);
// }
// **************************************************************** Log all custom SOURCES & LAYERS <-
