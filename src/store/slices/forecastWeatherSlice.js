// Redux/RTK
import { createSlice } from "@reduxjs/toolkit";

// Async Thunks
import { fetchForecastWeather } from "../thunks/fetchForecastWeather";

const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
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
    builder.addCase(fetchForecastWeather.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchForecastWeather.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchForecastWeather.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

// Export single combined reducer
export const forecastWeatherReducer = forecastWeatherSlice.reducer;
