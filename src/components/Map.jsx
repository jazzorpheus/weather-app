// React
import { useEffect, useState } from "react";

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

// *************************************************************************************  COMPONENT
function Map() {
  const renderCount = useRenderCount();
  console.log("RENDER COUNT:", renderCount);

  // MAP
  const mapObj = useSelector((state) => state.map.mapObj);
  // Initialize map
  const mapContainerRef = useInitMap();
  // Style loaded flag
  const [styleLoaded, setStyleLoaded] = useState(false);
  console.log("STYLE LOADED:", styleLoaded);

  // DROPDOWN LAYER
  const [selectedLayer, setSelectedLayer] = useState(null);
  console.log("NEW RENDER - Selected layer:", selectedLayer);
  // CURRENT LAYER
  const [layer, setLayer] = useState("red");
  console.log("NEW RENDER - Current layer:", layer);
  // PREV LAYER
  const [prevLayer, setPrevLayer] = useState(null);
  console.log("NEW RENDER - Previous layer:", prevLayer);

  // Dispatch function
  const dispatch = useDispatch();

  // // Get coords from store
  // const coords = useSelector((state) => state.coords.coords);

  // **********************************************************  STYLE DROPDOWN CONFIG

  const [selectedStyle, setSelectedStyle] = useState(null);

  // Change map style selection in dropdown, update map style
  const handleStyleSelect = (option) => {
    mapObj.on("style.load", () => {
      console.log("STYLE LOADED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // ****************************************************************  Log all custom layers currently added to map
      try {
        // Get all sources
        const sources = Object.values(mapObj.getStyle().sources);
        console.log("ALL SOURCES:", sources);
        // Get all layers
        const layers = mapObj.getStyle().layers;
        // Filter out custom layers
        const customLayers = layers.filter(function (layer) {
          // Check if the layer's ID starts with a specific prefix
          return layer.id.startsWith("custom-layer");
        });
        console.log("CUSTOM LAYERS:", customLayers);
      } catch (err) {
        console.log(err);
      }
      // ****************************************************************

      // Remove layers & sources
      const layers = mapObj.getStyle().layers;
      layers.forEach(function (layer) {
        if (layer.id.startsWith("custom-layer")) {
          mapObj.removeLayer(layer.id);
        }
      });
      const sourceIds = Object.keys(mapObj.getStyle().sources);
      sourceIds.forEach((sourceId) => {
        if (sourceId.startsWith("custom-source")) {
          mapObj.removeSource(sourceId);
        }
      });

      // Re-Add sources and layers
      console.log(`ADDING NEW ${layer} SOURCE`);
      mapObj.addSource(`custom-source-${layer}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-180, 90],
                [-180, -90],
                [180, -90],
                [180, 90],
                [-180, 90],
              ],
            ],
          },
        },
      });

      console.log(`ADDING NEW ${layer} LAYER`);
      mapObj.addLayer({
        id: `custom-layer-${layer}`, // Layer ID
        type: "fill",
        source: `custom-source-${layer}`,
        layout: {},
        paint: {
          "fill-color": `${layer}`, // Layer color
          "fill-opacity": 0.5,
        },
      });

      setStyleLoaded(true);
    });

    setSelectedStyle(option);
    dispatch(updateMapStyle(option.value));
  };
  // List of styleOptions
  const styleOptions = [
    { label: "Dark", value: "dark-v11" },
    { label: "Light", value: "light-v11" },
    { label: "Outdoors", value: "outdoors-v12" },
    { label: "Satellite", value: "satellite-streets-v12" },
    { label: "Streets", value: "streets-v12" },
  ];

  // **********************************************************************  LAYER EXPERIMENT

  // Change map layer selection in dropdown, update map layer
  const handleLayerSelect = (option) => {
    setSelectedLayer(option);
    console.log("HANDLE SELECT - Selected layer:", selectedLayer);
    console.log("HANDLE SELECT - Current layer:", layer);
    console.log("HANDLE SELECT - Previous layer:", prevLayer);
    setPrevLayer(layer);
    setLayer(option.value);
  };
  // List of layerOptions
  const layerOptions = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];

  useEffect(() => {
    console.log("USE EFFECT - Selected layer:", selectedLayer);
    console.log("USE EFFECT - Current layer:", layer);
    console.log("USE EFFECT - Previous layer:", prevLayer);

    if (mapObj) {
      if (prevLayer) {
        // Remove layers & sources
        // Remove layers & sources
        const layers = mapObj.getStyle().layers;
        layers.forEach(function (layer) {
          if (layer.id.startsWith("custom-layer")) {
            mapObj.removeLayer(layer.id);
          }
        });
        const sourceIds = Object.keys(mapObj.getStyle().sources);
        sourceIds.forEach((sourceId) => {
          if (sourceId.startsWith("custom-source")) {
            mapObj.removeSource(sourceId);
          }
        });
        // // OLD METHOD
        // if (mapObj.getLayer(`custom-layer-${prevLayer}`)) {
        //   console.log(`REMOVING PREV ${prevLayer} LAYER`);
        //   mapObj.removeLayer(`custom-layer-${prevLayer}`);
        // }
        // if (mapObj.getSource(`custom-source-${prevLayer}`)) {
        //   console.log(`REMOVING PREV ${prevLayer} SOURCE`);
        //   // Below did not work for some reason :S
        //   // // mapObj.removeSource(`custom-source-${prevLayer}`); // *** ******************************************
        //   // Instead, remove all sources except default
        //   const sourceIds = Object.keys(mapObj.getStyle().sources);
        //   sourceIds.forEach((sourceId) => {
        //     if (sourceId.startsWith("custom")) mapObj.removeSource(sourceId);
        //   });
        // }

        // Add sources & layers
        if (!mapObj.getSource(`custom-source-${layer}`)) {
          console.log(`ADDING NEW ${layer} SOURCE`);
          mapObj.addSource(`custom-source-${layer}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-180, 90],
                    [-180, -90],
                    [180, -90],
                    [180, 90],
                    [-180, 90],
                  ],
                ],
              },
            },
          });
        }
        if (!mapObj.getLayer(`custom-layer-${layer}`)) {
          console.log(`ADDING NEW ${layer} LAYER`);
          mapObj.addLayer({
            id: `custom-layer-${layer}`, // Layer ID
            type: "fill",
            source: `custom-source-${layer}`,
            layout: {},
            paint: {
              "fill-color": `${layer}`, // Layer color
              "fill-opacity": 0.5,
            },
          });
        }
      }
      // ********************************************************************** FIRST STYLE LOAD LISTENER
      if (layer && renderCount === 2) {
        console.log("SETTING STYLE LOAD LISTENER!!!");
        mapObj.once("style.load", () => {
          console.log(`ADDING NEW ${layer} SOURCE`);
          mapObj.addSource(`custom-source-${layer}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-180, 90],
                    [-180, -90],
                    [180, -90],
                    [180, 90],
                    [-180, 90],
                  ],
                ],
              },
            },
          });
          console.log(`ADDING NEW ${layer} LAYER`);
          mapObj.addLayer({
            id: `custom-layer-${layer}`, // Layer ID
            type: "fill",
            source: `custom-source-${layer}`,
            layout: {},
            paint: {
              "fill-color": `${layer}`, // Layer color
              "fill-opacity": 0.5,
            },
          });
        });
      }
    }
  }, [layer, mapObj]);

  // **********************************************************************  LAYER EXPERIMENT END

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-dvw">
        {/* <div className="sidebar text-white bg-gray-700 ">
          Longitude: {coords[0]} | Latitude: {coords[1]}
        </div> */}
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

// // Create on style load function to re-add current layer
// mapObj.on("style.load", () => {
//   try {
//     // Get all layers
//     var layers = mapObj.getStyle().layers;

//     // Filter out layers added manually by checking for specific IDs
//     var manuallyAddedLayers = layers.filter(function (layer) {
//       // Check if the layer's ID starts with a specific prefix that you assigned
//       // For example, if all your manually added layers have IDs starting with 'custom-', you can use this condition
//       return layer.id.startsWith("custom-");
//     });
//     console.log(manuallyAddedLayers);
//   } catch (err) {
//     console.error(err);
//   }

//   if (mapObj && mapObj.getLayer(`custom-${option.value}-layer`)) {
//     console.log(`IN STYLE LOAD - REMOVING PREV ${option.value} LAYER`);
//     mapObj.removeLayer(`custom-${option.value}-layer`);
//     // mapObj.removeSource(`${prevLayer}-source`);
//   }

//   if (mapObj) {
//     console.log(`IN STYLE LOAD - ADDING NEW ${option.value} LAYER`);
//     mapObj.addLayer({
//       id: `custom-${option.value}-layer`,
//       type: "fill",
//       source: {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           geometry: {
//             type: "Polygon",
//             coordinates: [
//               [
//                 [-180, 90],
//                 [-180, -90],
//                 [180, -90],
//                 [180, 90],
//                 [-180, 90],
//               ],
//             ],
//           },
//         },
//       },
//       layout: {},
//       paint: {
//         "fill-color": `${layer}`, // Red color
//         "fill-opacity": 0.5, // Adjust opacity as needed
//       },
//     });
//   }
// });
// console.log(`STYLE LOAD EVENT LISTENER CREATED FOR ${option.value} LAYER!`);

// // Change map layer selection in dropdown, update map layer
// const handleLayerSelect = (option) => {
//   setSelectedLayer(option);
//   // dispatch(updateLayerName(option.value));
//   console.log("HANDLE SELECT - Current layer:", layer);
//   console.log("HANDLE SELECT - Previous layer:", prevLayer);
//   setPrevLayer(layer);
//   setLayer(option.value);
// };
// // List of layerOptions
// const layerOptions = [
//   { label: "Precipitation", value: "precipitationIntensity" },
//   { label: "Temperature", value: "temperature" },
//   { label: "Wind Speed", value: "windSpeed" },
// ];

// useEffect(() => {
//   console.log("USE EFFECT - Current layer:", layer);
//   console.log("USE EFFECT - Previous layer:", prevLayer);

//   if (mapObj && mapObj.getLayer(`${prevLayer}-layer`)) {
//     console.log("REMOVING PREV LAYER");
//     mapObj.removeLayer(`${prevLayer}-layer`);
//     mapObj.removeSource(`${prevLayer}-source`);
//   }

//   console.log("ADDING NEW LAYER");
//   if (mapObj) {
//     mapObj.addSource(`${layer}-source`, {
//       type: "raster",
//       tiles: [
//         `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${layer}/${TIMESTAMP}.png?apikey=${TMW_KEY}`,
//       ],
//       tileSize: 256,
//       attribution:
//         '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
//     });
//     mapObj.addLayer({
//       id: `${layer}-layer`,
//       type: "raster",
//       source: `${layer}-source`,
//       minzoom: 1,
//       maxzoom: 12,
//       paint: {
//         "raster-opacity": 0.65,
//       },
//     });
//   }
// }, [layer]);

// // Tomorrow API
// const TMW_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";
// const TIMESTAMP = new Date().toISOString();
