// React
import { useEffect } from "react";

// React-Redux
// Action Creator Functions
import { updateMapObj, updateCoords, updateMarker } from "../store";

// Mapbox GL
import mapboxgl from "mapbox-gl";

const mbxToken =
  "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xyejhvZDgxMWo2ZTJscHF0Y2kxZnlpaiJ9.CnwtM75CEUYnlYQf6CxQcg";
// Mapbox access token
mapboxgl.accessToken = mbxToken;

function useCreateMap(mapContainerRef, mapStyle, center, dispatch) {
  useEffect(() => {
    // Create map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: center,
      // Zoom goes from 0 -> 22
      zoom: 4,
      pitch: 40,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );
    // // Render map marker at center
    // dispatch(
    //   updateMarker(
    //     new mapboxgl.Marker({
    //       draggable: false,
    //       scale: 1,
    //     })
    //       .setLngLat(center)
    //       .addTo(map)
    //   )
    // );
    // Event Listener: Change coords in store/state on user click
    map.on("click", (event) => {
      dispatch(updateCoords([event.lngLat.lng, event.lngLat.lat]));
    });

    // Create map object in store/state
    dispatch(updateMapObj(map));
  }, []);

  return;
}

export default useCreateMap;
