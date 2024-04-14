// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Async Thunks
import { fetchCoords } from "../thunks/fetchCoords";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    coords: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    updateCoords(state, action) {
      state.coords = action.payload;
      state.isLoading = false;
    },
  },
  // *****************************************************************************
  // *****************************  ASYNC THUNKS METHOD **************************
  // *****************************************************************************

  extraReducers(builder) {
    // ***************************************************************  fetchCoords
    builder.addCase(fetchCoords.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCoords.fulfilled, (state, action) => {
      state.coords = action.payload;
      console.log("FETCH COORDS FULFILLED", action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCoords.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

// Export action creator functions
export const { updateCoords } = coordsSlice.actions;

// Export single combined reducer
export const coordsReducer = coordsSlice.reducer;
