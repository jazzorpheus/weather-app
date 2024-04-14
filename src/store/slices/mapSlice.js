// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Configure mapSlice
const mapSlice = createSlice({
  name: "map",
  initialState: {
    mapObj: null,
    marker: null,
  },
  reducers: {
    updateMapObj(state, action) {
      state.mapObj = action.payload;
    },
    updateMapStyle(state, action) {
      state.mapObj.setStyle(action.payload);
    },
    updateMarker(state, action) {
      state.marker = action.payload;
    },
  },
});

// Export action creator functions
export const { updateMapObj, updateMapStyle, updateMarker } = mapSlice.actions;

// Export single combined reducer
export const mapReducer = mapSlice.reducer;
