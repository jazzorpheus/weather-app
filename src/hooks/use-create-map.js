// Action Creator Functions
import { updateMapObj, updateCoords, updateMarker } from "../store";

// Mapbox GL
import mapboxgl from "mapbox-gl";
const mbxToken =
  "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xyejhvZDgxMWo2ZTJscHF0Y2kxZnlpaiJ9.CnwtM75CEUYnlYQf6CxQcg";
// Mapbox access token
mapboxgl.accessToken = mbxToken;
// // GEOCODER: IMPORT & SET UP GEOCODING FROM MAPBOX-SDK
// import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
// const geocoder = mbxGeocoding({
//   accessToken: mbxToken,
// });

const TMW_KEY = "uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9";

function useCreateMap(mapContainerRef, center, dispatch) {
  // Create map
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/outdoors-v12",
    // style: "mapbox://styles/mapbox/light-v11",
    center: center,
    // Zoom goes from 0 -> 22
    zoom: 9,
  });
  // Add navigation control (the +/- zoom buttons)
  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true,
    }),
    "top-right"
  );
  // Render map marker at center
  dispatch(
    updateMarker(
      new mapboxgl.Marker({
        draggable: false,
        scale: 1,
      })
        .setLngLat(center)
        .addTo(map)
    )
  );
  // Event Listener: Change coords in store/state on user click
  map.on("click", (event) => {
    dispatch(updateCoords([event.lngLat.lng, event.lngLat.lat]));
  });

  // **********************************************************************************************************
  // *****************************************************************  LAYERS EXPERIMENT

  // // pick the field (like temperature, precipitationIntensity or cloudCover)
  // const DATA_FIELD = "precipitationIntensity";
  // // const DATA_FIELD = "temperature";

  // // set the ISO timestamp (now for all fields, up to 6 hour out for precipitationIntensity)
  // const TIMESTAMP = new Date().toISOString();

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
  //     paint: {
  //       "raster-opacity": 0.65,
  //     },
  //   });
  // });

  // *****************************************************************  LAYERS EXPERIMENT

  // In case needed later
  map.on("style.load", () => {
    // TBD
  });

  // Create map object in store/state
  dispatch(updateMapObj(map));

  return map;
}

export default useCreateMap;
