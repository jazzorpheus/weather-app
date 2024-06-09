export default function convertCurrentWeather(currentWeather) {
  const windDeg = currentWeather.data.wind.deg;
  let windCompass;

  if (windDeg >= 348.75 || windDeg < 11.25) {
    windCompass = "North";
  } else if (windDeg >= 11.25 && windDeg < 33.75) {
    windCompass = "North-Northeast";
  } else if (windDeg >= 33.75 && windDeg < 56.25) {
    windCompass = "Northeast";
  } else if (windDeg >= 56.25 && windDeg < 78.75) {
    windCompass = "East-Northeast";
  } else if (windDeg >= 78.75 && windDeg < 101.25) {
    windCompass = "East";
  } else if (windDeg >= 101.25 && windDeg < 123.75) {
    windCompass = "East-Southeast";
  } else if (windDeg >= 123.75 && windDeg < 146.25) {
    windCompass = "Southeast";
  } else if (windDeg >= 146.25 && windDeg < 168.75) {
    windCompass = "South-Southeast";
  } else if (windDeg >= 168.75 && windDeg < 191.25) {
    windCompass = "South";
  } else if (windDeg >= 191.25 && windDeg < 213.75) {
    windCompass = "South-Southwest";
  } else if (windDeg >= 213.75 && windDeg < 236.25) {
    windCompass = "Southwest";
  } else if (windDeg >= 236.25 && windDeg < 258.75) {
    windCompass = "West-Southwest";
  } else if (windDeg >= 258.75 && windDeg < 281.25) {
    windCompass = "West";
  } else if (windDeg >= 281.25 && windDeg < 303.75) {
    windCompass = "West-Northwest";
  } else if (windDeg >= 303.75 && windDeg < 326.25) {
    windCompass = "Northwest";
  } else if (windDeg >= 326.25 && windDeg < 348.75) {
    windCompass = "North-Northwest";
  }

  return [
    { name: "Location", value: currentWeather.data.name, units: "" },
    { name: "Main", value: currentWeather.data.weather[0].main, units: "" },
    {
      name: "Description",
      value: currentWeather.data.weather[0].description,
      units: "",
    },
    {
      name: "Temperature",
      value: (currentWeather.data.main.temp - 273.15).toFixed(1),
      units: "°C",
    },
    {
      name: "Feels like",
      value: (currentWeather.data.main.feels_like - 273.15).toFixed(1),
      units: "°C",
    },
    { name: "Humidity", value: currentWeather.data.main.humidity, units: "%" },
    {
      name: "Wind speed",
      value: (60 ** 2 * (currentWeather.data.wind.speed / 1609.34)).toFixed(1),
      units: "mph",
    },
    {
      name: "Wind direction",
      value: windCompass,
      units: "",
    },
  ];
}
