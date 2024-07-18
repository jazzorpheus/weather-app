// Utilities
import convertWindDir from "./convertWindDir";
import convertWindSpeed from "./convertWindSpeed";

export default function convertWeatherData(weather) {
  // Wind direction
  const { windCompass, windCompassStyles } = convertWindDir(weather.wind.deg);
  // Wind speed
  console.log("Weather:", weather.wind.speed);
  const { intensityIdx: intensityIdxSpeed, mphVal: mphValSpeed } =
    convertWindSpeed(weather.wind.speed);
  console.log("Speed:", intensityIdxSpeed, mphValSpeed);
  // Wind gust
  const { intensityIdx: intensityIdxGust, mphVal: mphValGust } =
    convertWindSpeed(weather.wind.gust);
  console.log("Gust:", intensityIdxGust, mphValGust);

  return [
    { name: "Location", value: weather.name, units: "" },
    {
      name: "Description",
      value: weather.weather[0].description,
      units: "",
    },
    {
      name: "Temperature",
      value: weather.main.temp.toFixed(1),
      units: "°C",
    },
    {
      name: "Feels like",
      value: weather.main.feels_like.toFixed(1),
      units: "°C",
    },
    {
      name: "Cloud cover",
      value: weather.clouds.all,
      units: "%",
    },
    { name: "Humidity", value: weather.main.humidity, units: "%" },
    {
      name: "Wind speed",
      value: mphValSpeed,
      intensityIdxSpeed,
      units: "mph",
    },
    {
      name: "Wind gust",
      value: weather.wind.gust ? mphValGust : "N/A",
      intensityIdxGust,
      units: weather.wind.gust ? "mph" : "",
    },
    {
      name: "Wind direction",
      value: windCompass,
      styles: windCompassStyles,
    },
    {
      name: "Visibility",
      value: weather.visibility / 1000,
      units: "km",
    },
  ];
}
