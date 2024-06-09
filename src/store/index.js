// Redux/RTK
import { configureStore } from "@reduxjs/toolkit";

// Import combined reducer and action creator functions from mapSlice
import {
  mapReducer,
  updateMapObj,
  updateMapStyle,
  updateMarker,
  updateLayer,
  updatePrevLayer,
} from "./slices/mapSlice";

// Import combined reducer and action creator functions from coordsSlice
import { coordsReducer, updateCoords } from "./slices/coordsSlice";

// Import combined reducer and action creator functions from currentWeatherSlice
import { currentWeatherReducer } from "./slices/currentWeatherSlice";

// Import combined reducer and action creator functions from forecastWeatherSlice
import { forecastWeatherReducer } from "./slices/forecastWeatherSlice";

// Configure store
const store = configureStore({
  reducer: {
    map: mapReducer,
    coords: coordsReducer,
    currentWeather: currentWeatherReducer,
    forecastWeather: forecastWeatherReducer,
  },
  // Allow non-serializable values in the store (for the map object)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export store and action creators
export {
  store,
  updateMapObj,
  updateMapStyle,
  updateMarker,
  updateLayer,
  updatePrevLayer,
  updateCoords,
};

// Re-Export async thunks
export * from "./thunks/fetchCurrentWeather";
export * from "./thunks/fetchForecastWeather";
