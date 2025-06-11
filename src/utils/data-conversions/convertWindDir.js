export default function convertWindDir(windDeg) {
  if (!windDeg) return "N/A";

  if (windDeg >= 348.75 || windDeg < 11.25) {
    return { windCompass: "N", windCompassStyles: "inline rotate-[135deg]" };
  } else if (windDeg >= 11.25 && windDeg < 33.75) {
    return {
      windCompass: "NNE",
      windCompassStyles: "inline rotate-[157.5deg]",
    };
  } else if (windDeg >= 33.75 && windDeg < 56.25) {
    return {
      windCompass: "NE",
      windCompassStyles: "inline rotate-[180deg]",
    };
  } else if (windDeg >= 56.25 && windDeg < 78.75) {
    return {
      windCompass: "ENE",
      windCompassStyles: "inline rotate-[-157.5deg]",
    };
  } else if (windDeg >= 78.75 && windDeg < 101.25) {
    return { windCompass: "E", windCompassStyles: "inline rotate-[-135deg]" };
  } else if (windDeg >= 101.25 && windDeg < 123.75) {
    return {
      windCompass: "ESE",
      windCompassStyles: "inline rotate-[-112.5deg]",
    };
  } else if (windDeg >= 123.75 && windDeg < 146.25) {
    return { windCompass: "SE", windCompassStyles: "inline rotate-[-90deg]" };
  } else if (windDeg >= 146.25 && windDeg < 168.75) {
    return {
      windCompass: "SSE",
      windCompassStyles: "inline rotate-[-67.5deg]",
    };
  } else if (windDeg >= 168.75 && windDeg < 191.25) {
    return { windCompass: "S", windCompassStyles: "inline rotate-[-45deg]" };
  } else if (windDeg >= 191.25 && windDeg < 213.75) {
    return {
      windCompass: "SSW",
      windCompassStyles: "inline rotate-[-22.5deg]",
    };
  } else if (windDeg >= 213.75 && windDeg < 236.25) {
    return { windCompass: "SW", windCompassStyles: "inline rotate-[0deg]" };
  } else if (windDeg >= 236.25 && windDeg < 258.75) {
    return { windCompass: "WSW", windCompassStyles: "inline rotate-[22.5deg]" };
  } else if (windDeg >= 258.75 && windDeg < 281.25) {
    return { windCompass: "W", windCompassStyles: "inline rotate-[45deg]" };
  } else if (windDeg >= 281.25 && windDeg < 303.75) {
    return { windCompass: "WNW", windCompassStyles: "inline rotate-[67.5deg]" };
  } else if (windDeg >= 303.75 && windDeg < 326.25) {
    return { windCompass: "NW", windCompassStyles: "inline rotate-[90deg]" };
  } else if (windDeg >= 326.25 && windDeg < 348.75) {
    return {
      windCompass: "NNW",
      windCompassStyles: "inline rotate-[112.5deg]",
    };
  }
}
