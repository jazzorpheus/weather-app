// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    // coords: [-2.245115, 53.479489],
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
  // ************************  OLD ASYNC THUNKS METHOD ***************************
  // *****************************************************************************

  // extraReducers(builder) {
  //   // ***************************************************************  fetchCoords
  //   builder.addCase(fetchCoords.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(fetchCoords.fulfilled, (state, action) => {
  //     state.coords = action.payload;
  //     state.isLoading = false;
  //     state.error = null;
  //   });
  //   builder.addCase(fetchCoords.rejected, (state, action) => {
  //     state.error = action.error;
  //     state.isLoading = false;
  //   });
  // },
});

// Export action creator functions
export const { updateCoords } = coordsSlice.actions;

// Export single combined reducer
export const coordsReducer = coordsSlice.reducer;
