// React
import { useState, useEffect } from "react";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Action Creator Functions
import { updateMapStyle } from "../store";

// Custom Hooks
import useInitMap from "../hooks/use-init-map";

// My Components
import Dropdown from "./Dropdown";

// @uidotdev/usehooks
// Give access to variable that counts number of renders
import { useRenderCount } from "@uidotdev/usehooks";

// Tomorrow API
const TMW_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";
const TIMESTAMP = new Date().toISOString();

// *************************************************************************************  COMPONENT
function Map() {
  // ******************************************************** INIT MAP, STATE, DISPATCH
  // Map object & reference
  const mapContainerRef = useInitMap();
  const mapObj = useSelector((state) => state.map.mapObj);
  //! Coords from store for displaying on map: DEV ONLY
  const coords = useSelector((state) => state.coords.coords);

  // Keep track of total number of renders
  const renderCount = useRenderCount();
  console.log("RENDER COUNT:", renderCount);

  // Selected layer in dropdown
  const [selectedLayer, setSelectedLayer] = useState(null);
  console.log("NEW RENDER - Selected layer:", selectedLayer);
  // Current layer
  //! PRODUCTION ONLY
  const [layer, setLayer] = useState("none");
  // ! DEV ONLY
  // const [layer, setLayer] = useState("blue");
  console.log("NEW RENDER - Current layer:", layer);
  // Previous layer
  const [prevLayer, setPrevLayer] = useState(null);
  console.log("NEW RENDER - Previous layer:", prevLayer);

  // Map style
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Action dispatch function for updating map style
  const dispatch = useDispatch();

  // **********************************************************************  LAYER FUNCTIONS

  // ! ******************************************************** ADD LAYER TOMORROW: PRODUCTION ONLY

  // Remove custom layers
  const removeCustomLayers = () => {
    const allLayers = mapObj.getStyle().layers;
    allLayers.forEach((layer) => {
      if (layer.id.startsWith("custom-layer")) {
        console.log(`REMOVING ${layer.id} LAYER`);
        mapObj.removeLayer(layer.id);
      }
    });
    // Remove sources
    const allSources = Object.keys(mapObj.getStyle().sources);
    allSources.forEach((sourceId) => {
      if (sourceId.startsWith("custom-source")) {
        console.log(`REMOVING ${sourceId} SOURCE`);
        mapObj.removeSource(sourceId);
      }
      return;
    });
  };

  // Add current layer
  const addCurrentLayer = () => {
    // Check whether source & layer already exist
    const allSources = Object.keys(mapObj.getStyle().sources);
    if (!allSources.some((source) => source === `custom-source-${layer}`)) {
      // Add source
      console.log(`ADDING NEW custom-source-${layer} SOURCE`);
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
      console.log(`ADDING NEW custom-layer-${layer} LAYER`);
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

  // ! ******************************************************** ADD LAYER BASIC: DEV ONLY

  // // Remove custom layers
  // const removeCustomLayers = () => {
  //   const allLayers = mapObj.getStyle().layers;
  //   allLayers.forEach((layer) => {
  //     if (layer.id.startsWith("custom-layer")) {
  //       console.log(`REMOVING ${layer.id} LAYER`);
  //       mapObj.removeLayer(layer.id);
  //     }
  //   });
  //   // Remove sources
  //   const allSources = Object.keys(mapObj.getStyle().sources);
  //   allSources.forEach((sourceId) => {
  //     if (sourceId.startsWith("custom-source")) {
  //       console.log(`REMOVING ${sourceId} SOURCE`);
  //       mapObj.removeSource(sourceId);
  //     }
  //     return;
  //   });
  // };

  // // Add current layer
  // const addCurrentLayer = () => {
  //   // Check whether source & layer already exist
  //   const allSources = Object.keys(mapObj.getStyle().sources);
  //   if (!allSources.some((source) => source === `custom-source-${layer}`)) {
  //     // Add source
  //     console.log(`ADDING NEW custom-source-${layer} SOURCE`);
  //     mapObj.addSource(`custom-source-${layer}`, {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         geometry: {
  //           type: "Polygon",
  //           coordinates: [
  //             [
  //               [-180, 90],
  //               [-180, -90],
  //               [180, -90],
  //               [180, 90],
  //               [-180, 90],
  //             ],
  //           ],
  //         },
  //       },
  //     });
  //     // Add layer
  //     console.log(`ADDING NEW custom-layer-${layer} LAYER`);
  //     mapObj.addLayer({
  //       id: `custom-layer-${layer}`, // Layer ID
  //       type: "fill",
  //       source: `custom-source-${layer}`,
  //       layout: {},
  //       paint: {
  //         "fill-color": `${layer}`, // Layer color
  //         "fill-opacity": 0.5,
  //       },
  //     });
  //   }
  // };

  // **********************************************************************  LAYER FUNCTIONS END

  // **********************************************************  STYLE DROPDOWN CONFIG

  // Handle style selection
  const handleStyleSelect = (option) => {
    // Set dropdown style to selected option
    setSelectedStyle(option);
    // Update map style in store
    dispatch(updateMapStyle(option.value));

    // Re-add current layer (if there was one) once new style has loaded
    if (mapObj && layer !== "none") {
      console.log(
        "NEW STYLE - Setting style.load event listener to re-add current layer"
      );
      mapObj.once("style.load", addCurrentLayer);
    }
  };

  // List of styleOptions
  const styleOptions = [
    { label: "Dark", value: "dark-v11" },
    { label: "Light", value: "light-v11" },
    { label: "Outdoors", value: "outdoors-v12" },
    { label: "Satellite", value: "satellite-streets-v12" },
    { label: "Streets", value: "streets-v12" },
  ];

  // **********************************************************  LAYER DROPDOWN CONFIG

  // Change map layer selection in dropdown, update map layer
  const handleLayerSelect = (option) => {
    setSelectedLayer(option);
    console.log("HANDLE LAYER SELECT - Selected layer:", selectedLayer);
    console.log("HANDLE LAYER SELECT - Current layer:", layer);
    console.log("HANDLE LAYER SELECT - Previous layer:", prevLayer);
    setPrevLayer(layer);
    setLayer(option.value);
  };

  //! List of layer options for Tomorrow API's core layers: PRODUCTION ONLY
  const layerOptions = [
    { label: "Precipitation", value: "precipitationIntensity" },
    { label: "Temperature", value: "temperature" },
    { label: "Wind Speed", value: "windSpeed" },
    { label: "No Layer", value: "none" },
  ];

  //! List of layer options: DEV ONLY
  // const layerOptions = [
  //   { label: "Red", value: "red" },
  //   { label: "Green", value: "green" },
  //   { label: "Blue", value: "blue" },
  //   { label: "No Layer", value: "none" },
  // ];

  // Render initial layer & update layer
  useEffect(() => {
    console.log("USE EFFECT - Selected layer:", selectedLayer);
    console.log("USE EFFECT - Current layer:", layer);
    console.log("USE EFFECT - Previous layer:", prevLayer);

    if (mapObj) {
      // Update layer
      if (prevLayer) {
        if (layer !== "none") {
          removeCustomLayers();
          addCurrentLayer();
        } else {
          removeCustomLayers();
        }
      }
    }
  }, [layer]);

  // Render initial layer
  if (layer !== "none" && renderCount === 2) {
    console.log("SETTING FIRST STYLE LOAD LISTENER!");
    mapObj.once("style.load", addCurrentLayer);
  }

  return (
    <div className="map-container flex flex-col justify-center items-center">
      <div className="w-dvw">
        <div className="sidebar text-white bg-gray-700 ">
          Longitude: {coords[0]} | Latitude: {coords[1]}
        </div>
        <div
          ref={mapContainerRef}
          className="map-container w-100 border-4 border-gray-900"
        />
        <div className="absolute -translate-y-12 translate-x-4">
          <Dropdown
            label="Map Style"
            options={styleOptions}
            value={selectedStyle}
            onChange={handleStyleSelect}
          />
        </div>
        <div className="absolute -translate-y-12 translate-x-40">
          <Dropdown
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

// ****************************************************************  Log all custom SOURCES & LAYERS START
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
// **************************************************************** Log all custom SOURCES & LAYERS END
