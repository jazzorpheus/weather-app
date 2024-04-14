// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Async Thunks
import { fetchWeatherData } from "../thunks/fetchWeatherData";

const weatherDataSlice = createSlice({
  name: "weatherData",
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
    builder.addCase(fetchWeatherData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log("WEATHER DATA FULFILLED:", action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

// Export single combined reducer
export const weatherDataReducer = weatherDataSlice.reducer;
