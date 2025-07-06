// Map style options
export const STYLE_OPTIONS = [
  { label: "Dark", value: "dark-v11" },
  { label: "Light", value: "light-v11" },
  { label: "Outdoors", value: "outdoors-v12" },
  { label: "Satellite", value: "satellite-streets-v12" },
  { label: "Streets", value: "streets-v12" },
];

// Layer options (OpenWeatherMap)
export const LAYER_OPTIONS = [
  { label: "Cloud Cover", value: "clouds_new" },
  { label: "Precipitation", value: "precipitation_new" },
  { label: "Pressure (sea)", value: "pressure_new" },
  { label: "Temperature", value: "temp_new" },
  { label: "Wind Speed", value: "wind_new" },
  { label: "No Layer", value: "none" },
];

// Layer paint properties configuration
export const LAYER_PAINT_CONFIG = {
  default: {
    "raster-opacity": 0.5,
    "raster-saturation": 0.98,
  },
  pressure_new: {
    "raster-opacity": 0.5,
    "raster-saturation": 0.8,
  },
  temp_new: {
    "raster-opacity": 0.5,
    "raster-saturation": 0.8,
  },
  wind_new: {
    "raster-opacity": 0.5,
    "raster-saturation": 0.98,
  },
};
