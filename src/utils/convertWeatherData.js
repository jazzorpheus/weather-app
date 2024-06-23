export default function convertWeatherData(weather) {
  const windDeg = weather.wind.deg;
  let windCompass;
  let iconStyles;

  if (windDeg >= 348.75 || windDeg < 11.25) {
    windCompass = "N";
    iconStyles = "inline rotate-[135deg]";
  } else if (windDeg >= 11.25 && windDeg < 33.75) {
    windCompass = "NNE";
    iconStyles = "inline rotate-[157.5deg]";
  } else if (windDeg >= 33.75 && windDeg < 56.25) {
    windCompass = "NE";
    iconStyles = "inline rotate-[180deg]";
  } else if (windDeg >= 56.25 && windDeg < 78.75) {
    windCompass = "ENE";
    iconStyles = "inline rotate-[-157.5deg]";
  } else if (windDeg >= 78.75 && windDeg < 101.25) {
    windCompass = "E";
    iconStyles = "inline rotate-[-135deg]";
  } else if (windDeg >= 101.25 && windDeg < 123.75) {
    windCompass = "ESE";
    iconStyles = "inline rotate-[-112.5deg]";
  } else if (windDeg >= 123.75 && windDeg < 146.25) {
    windCompass = "SE";
    iconStyles = "inline rotate-[-90deg]";
  } else if (windDeg >= 146.25 && windDeg < 168.75) {
    windCompass = "SSE";
    iconStyles = "inline rotate-[-67.5deg]";
  } else if (windDeg >= 168.75 && windDeg < 191.25) {
    windCompass = "S";
    iconStyles = "inline rotate-[-45deg]";
  } else if (windDeg >= 191.25 && windDeg < 213.75) {
    windCompass = "SSW";
    iconStyles = "inline rotate-[-22.5deg]";
  } else if (windDeg >= 213.75 && windDeg < 236.25) {
    windCompass = "SW";
    iconStyles = "inline rotate-[0deg]";
  } else if (windDeg >= 236.25 && windDeg < 258.75) {
    windCompass = "WSW";
    iconStyles = "inline rotate-[22.5deg]";
  } else if (windDeg >= 258.75 && windDeg < 281.25) {
    windCompass = "W";
    iconStyles = "inline rotate-[45deg]";
  } else if (windDeg >= 281.25 && windDeg < 303.75) {
    windCompass = "WNW";
    iconStyles = "inline rotate-[67.5deg]";
  } else if (windDeg >= 303.75 && windDeg < 326.25) {
    windCompass = "NW";
    iconStyles = "inline rotate-[90deg]";
  } else if (windDeg >= 326.25 && windDeg < 348.75) {
    windCompass = "NNW";
    iconStyles = "inline rotate-[112.5deg]";
  }

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
      value: (60 ** 2 * (weather.wind.speed / 1609.34)).toFixed(1),
      units: "mph",
    },
    {
      name: "Wind gust",
      value: weather.wind.gust
        ? (60 ** 2 * (weather.wind.gust / 1609.34)).toFixed(1)
        : "Data not available",
      units: weather.wind.gust ? "mph" : "",
    },
    {
      name: "Wind direction",
      value: windCompass,
      styles: iconStyles,
    },
    {
      name: "Visibility",
      value: weather.visibility / 1000,
      units: "km",
    },
  ];
}
