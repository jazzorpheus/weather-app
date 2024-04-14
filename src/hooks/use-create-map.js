// Action Creator Functions
import { updateMapObj, updateCoords, updateMarker } from "../store";

// Mapbox GL
import mapboxgl from "mapbox-gl";
// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xyejhvZDgxMWo2ZTJscHF0Y2kxZnlpaiJ9.CnwtM75CEUYnlYQf6CxQcg";

function useCreateMap(mapContainerRef, center, dispatch) {
  // Create map
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/outdoors-v12",
    center: center,
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

  // // In case needed later
  // map.on("style.load", () => {
  //   // TBD
  // });

  // Create map object in store/state
  dispatch(updateMapObj(map));

  return map;
}

export default useCreateMap;
