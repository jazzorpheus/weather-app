// Utilities
import convertWindDir from "./convertWindDir";
import convertWindSpeed from "./convertWindSpeed";

export default function convertWeatherData(data) {
  if (!data) return null;

  const { windCompass, windCompassStyles } = convertWindDir(data.wind.deg);
  const { intensityIdx: intensityIdxSpeed, mphVal: mphValSpeed } =
    convertWindSpeed(data.wind.speed);

  // Check if gust data exists (not all data points contain gust data)
  const gustConversion = data.wind.gust
    ? convertWindSpeed(data.wind.gust)
    : null;
  const intensityIdxGust = gustConversion?.intensityIdx;
  const mphValGust = gustConversion?.mphVal;

  return {
    location: {
      name: "Location",
      value: data.name,
      units: "",
    },
    description: {
      name: "Description",
      value: data.weather[0].description,
      units: "",
    },
    temperature: {
      name: "Temperature",
      value: data.main.temp.toFixed(1),
      units: "°C",
    },
    feelsLike: {
      name: "Feels like",
      value: data.main.feels_like.toFixed(1),
      units: "°C",
    },
    cloudCover: {
      name: "Cloud cover",
      value: data.clouds.all,
      units: "%",
    },
    humidity: {
      name: "Humidity",
      value: data.main.humidity,
      units: "%",
    },
    windSpeed: {
      name: "Wind speed",
      value: mphValSpeed,
      intensityIdx: intensityIdxSpeed,
      units: "mph",
    },
    windGust: {
      name: "Wind gust",
      value: mphValGust ?? "N/A",
      intensityIdx: intensityIdxGust,
      units: gustConversion ? "mph" : "",
    },
    windDirection: {
      name: "Wind direction",
      value: windCompass,
      styles: windCompassStyles,
      units: "",
    },
    visibility: {
      name: "Visibility",
      value: data.visibility / 1000,
      units: "km",
    },
  };
}
