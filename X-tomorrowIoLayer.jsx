// *****************************************************************************************
// *****************************************************************************************
// ! How to get PNGs from Tomorrow.io to add as layers
// *****************************************************************************************
// *****************************************************************************************
// const apiEndpoint = "https://api.tomorrow.io/v4/map/tile/";
// const apiKey = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";

// // Zoom levels: 1-12
// // X Coordinate: 0-3
// // Y Coordinate: 0-2
// const coordinates = { zoom: 8, x: 2, y: 3 };
// const mapType = "temperature"; // Change this to the desired map type (e.g., precipitationIntensity)

// const url = `${apiEndpoint}${coordinates.zoom}/${coordinates.x}/${coordinates.y}/${mapType}/now.png?apikey=${apiKey}`;

// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.blob(); // Get response as Blob
//   })
//   .then((blob) => {
//     const imageUrl = URL.createObjectURL(blob); // Create URL for Blob
//     map.on("load", () => {
//       map.addSource("tomorrowio-image", {
//         type: "image",
//         url: imageUrl,
//         coordinates: [
//           // [-80, 50], // Top-left coordinate of the image
//           // [-70, 50], // Top-right coordinate of the image
//           // [-70, 40], // Bottom-right coordinate of the image
//           // [-80, 40], // Bottom-left coordinate of the image
//           [0, 50], // Top-left coordinate of the image
//           [10, 50], // Top-right coordinate of the image
//           [10, 40], // Bottom-right coordinate of the image
//           [0, 40], // Bottom-left coordinate of the image
//         ],
//       });
//       map.addLayer({
//         id: "tomorrowio-layer",
//         type: "raster",
//         source: "tomorrowio-image",
//       });
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching Tomorrow.io image:", error);
//   });

// *****************************************************************************************
// *****************************************************************************************
// ! Add Tomorrow.io weather layer to Mapbox map
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xid25sbDhnMHlzZTN1bXNiejBvOXl0eiJ9.yv9LtnmzsC6A7a74Fwod7Q";
// *****************************************************************************************
// *****************************************************************************************

// // get your key from app.tomorrow.io/development/keys
// const API_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";

// // pick the field (like temperature, precipitationIntensity or cloudCover)
// const DATA_FIELD = "precipitationIntensity";

// // set the ISO timestamp (now for all fields, up to 6 hour out for precipitationIntensity)
// const TIMESTAMP = new Date().toISOString();

// // initialize the map
// var map = (window.map = new mapboxgl.Map({
//   container: "map",
//   zoom: 3,
//   center: [7.5, 58],
//   style: "mapbox://styles/mapbox/light-v10",
//   antialias: true,
// }));

// // inject the tile layer
// map.on("load", function () {
//   map.addSource("tomorrow-io-api", {
//     type: "raster",
//     tiles: [
//       `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${TMW_KEY}`,
//     ],
//     tileSize: 256,
//     attribution:
//       '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
//   });
//   map.addLayer({
//     id: "radar-tiles",
//     type: "raster",
//     source: "tomorrow-io-api",
//     minzoom: 1,
//     maxzoom: 12,
//   });
// });
// *****************************************************************************************
// *****************************************************************************************
// ! Tomorrow.io example:
// ! Use premium data fields with the Weather Map API to visualize air quality and pollen forecasts and trends.
// *****************************************************************************************
// *****************************************************************************************
// const mapboxgl = require("mapbox-gl");
// const moment = require("moment");

// // Set your API key
// const apiKey = "add your API key here";

// // Set your Mapbox access token
// mapboxgl.accessToken = "add your Mapbox access token here";

// // initialize the map
// var map = new mapboxgl.Map({
//   container: "map",
//   zoom: 3,
//   center: [980, 40],
//   style: "mapbox://styles/mapbox/light-v10",
//   antialias: true,
// });

// // set the timestamp
// const timestamp = moment.utc().add(6, "hours").toISOString();

// // set the format
// const format = ".png";

// // organize the fields to visualize
// const pollutionFieldsConfig = [
//   {
//     field: "epaIndex",
//     paintProps: {
//       "raster-opacity": 0.2,
//     },
//   },
//   {
//     field: "pollutantO3",
//     paintProps: {
//       "raster-opacity": 0.2,
//     },
//   },
//   {
//     field: "pollutantNO2",
//   },
//   {
//     field: "pollutantCO",
//     paintProps: {
//       "raster-opacity": 0.4,
//     },
//   },
//   {
//     field: "pollutantSO2",
//   },
// ];

// const pollenFieldsConfig = [
//   {
//     field: "grassIndex",
//   },
//   {
//     field: "weedIndex",
//   },
// ];

// function visualizeTrendsOnMap(fieldsConfig) {
//   // inject the tile layers
//   map.on("load", function () {
//     fieldsConfig.forEach((f) => {
//       const { field, paintProps } = f;
//       map.addSource(`tomorrow-io-api-${field}`, {
//         type: "raster",
//         tiles: [
//           `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${field}/${timestamp}${format}?apikey=${apiKey}`,
//         ],
//         tileSize: 256,
//         attribution:
//           '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
//       });
//       map.addLayer({
//         id: `${field}-tiles`,
//         type: "raster",
//         source: `tomorrow-io-api-${field}`,
//         minzoom: 1,
//         maxzoom: 12,
//       });
//       Object.entries(paintProps || {}).forEach(([prop, val]) => {
//         map.setPaintProperty(`${field}-tiles`, prop, val);
//       });
//     });
//   });
// }

// visualizeTrendsOnMap(pollenFieldsConfig);
