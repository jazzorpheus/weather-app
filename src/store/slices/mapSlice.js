// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Configure mapSlice
const mapSlice = createSlice({
  name: "map",
  initialState: {
    mapObj: null,
    marker: null,
    // layerName: null,
  },
  reducers: {
    updateMapObj(state, action) {
      state.mapObj = action.payload;
    },
    updateMapStyle(state, action) {
      state.mapObj.setStyle(`mapbox://styles/mapbox/${action.payload}`);
    },
    updateMarker(state, action) {
      state.marker = action.payload;
    },
    // updateLayerName(state, action) {
    // state.layerName = action.payload;
    // if (state.mapObj.getLayer("radar-tiles")) {
    //   state.mapObj.removeLayer("radar-tiles");
    //   state.mapObj.removeSource("tomorrow-io-api");
    // }
    // // TODO
    // state.mapObj.addSource("tomorrow-io-api", {
    //   type: "raster",
    //   tiles: [
    //     `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${action.payload}/${TIMESTAMP}.png?apikey=${TMW_KEY}`,
    //   ],
    //   tileSize: 256,
    //   attribution:
    //     '&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>',
    // });
    // state.mapObj.addLayer({
    //   id: "radar-tiles",
    //   type: "raster",
    //   source: "tomorrow-io-api",
    //   minzoom: 1,
    //   maxzoom: 12,
    //   paint: {
    //     "raster-opacity": 0.65,
    //   },
    // });
    // },
  },
});

// Export action creator functions
export const { updateMapObj, updateMapStyle, updateMarker, updateLayerName } =
  mapSlice.actions;

// Export single combined reducer
export const mapReducer = mapSlice.reducer;
