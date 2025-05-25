// Utilities
import convertWindDir from "./convertWindDir";
import convertWindSpeed from "./convertWindSpeed";

export default function convertWeatherData(weather) {
  // Wind direction
  const { windCompass, windCompassStyles } = convertWindDir(weather.wind.deg);
  // Wind speed
  const { intensityIdx: intensityIdxSpeed, mphVal: mphValSpeed } =
    convertWindSpeed(weather.wind.speed);
  // Wind gust
  const { intensityIdx: intensityIdxGust, mphVal: mphValGust } =
    convertWindSpeed(weather.wind.gust);

  return {
    location: {
      name: "Location",
      value: weather.name || "N/A",
      units: "",
    },
    description: {
      name: "Description",
      value: weather.weather[0].description,
      units: "",
    },
    temperature: {
      name: "Temperature",
      value: weather.main.temp.toFixed(1),
      units: "°C",
    },
    feelsLike: {
      name: "Feels like",
      value: weather.main.feels_like.toFixed(1),
      units: "°C",
    },
    cloudCover: {
      name: "Cloud cover",
      value: weather.clouds.all,
      units: "%",
    },
    humidity: {
      name: "Humidity",
      value: weather.main.humidity,
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
      value: weather.wind.gust ? mphValGust : "N/A",
      intensityIdx: intensityIdxGust,
      units: weather.wind.gust ? "mph" : "",
    },
    windDirection: {
      name: "Wind direction",
      value: windCompass,
      styles: windCompassStyles,
      units: "",
    },
    visibility: {
      name: "Visibility",
      value: weather.visibility / 1000,
      units: "km",
    },
  };
}
