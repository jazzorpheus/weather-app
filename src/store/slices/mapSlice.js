// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Configure mapSlice
const mapSlice = createSlice({
  name: "map",
  initialState: {
    mapObj: null,
    mapStyle: "satellite-streets-v12",
    marker: null,
    // layer: "none",
    layer: "clouds_new",
    prevLayer: null,
  },
  reducers: {
    updateMapObj(state, action) {
      state.mapObj = action.payload;
    },
    updateMapStyle(state, action) {
      state.mapObj.setStyle(`mapbox://styles/mapbox/${action.payload}`);
      state.mapStyle = action.payload;
    },
    updateMarker(state, action) {
      state.marker = action.payload;
    },
    updateLayer(state, action) {
      state.layer = action.payload;
    },
    updatePrevLayer(state, action) {
      state.prevLayer = action.payload;
    },
  },
});

// Export action creator functions
export const {
  updateMapObj,
  updateMapStyle,
  updateMarker,
  updateLayer,
  updatePrevLayer,
} = mapSlice.actions;

// Export single combined reducer
export const mapReducer = mapSlice.reducer;
