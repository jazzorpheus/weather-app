// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    coords: [-2.245115, 53.479489],
    isLoading: true,
    error: null,
  },
  reducers: {
    updateCoords(state, action) {
      state.coords = action.payload;
      state.isLoading = false;
    },
  },
});

// Export action creator functions
export const { updateCoords } = coordsSlice.actions;

// Export single combined reducer
export const coordsReducer = coordsSlice.reducer;
