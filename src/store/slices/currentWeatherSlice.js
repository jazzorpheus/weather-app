// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Async Thunks
import { fetchCurrentWeather } from "../thunks/fetchCurrentWeather";

const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: {
    data: null,
    isLoading: true,
    error: null,
  },
  // *****************************************************************************
  // *****************************  ASYNC THUNKS METHOD **************************
  // *****************************************************************************

  extraReducers(builder) {
    // ***************************************************************  fetchWeather
    builder.addCase(fetchCurrentWeather.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

// Export single combined reducer
export const currentWeatherReducer = currentWeatherSlice.reducer;
