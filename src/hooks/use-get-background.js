// React-Redux Hooks
import { useSelector } from "react-redux";

function useGetBackground() {
  const weatherData = useSelector((state) => state.weatherData);
  let main;
  let styles = "app flex flex-col items-center";
  if (weatherData.data) {
    main = weatherData.data.weather[0].main;
    switch (main) {
      case "Ash":
        styles += " bg-mist";
        break;
      case "Clear":
        styles += " bg-clear";
        break;
      case "Clouds":
        styles += " bg-clouds";
        break;
      case "Drizzle":
        styles += " bg-rain";
        break;
      case "Dust":
        styles += " bg-mist";
        break;
      case "Fog":
        styles += " bg-mist";
        break;
      case "Haze":
        styles += " bg-haze";
        break;
      case "Mist":
        styles += " bg-mist";
        break;
      case "Rain":
        styles += " bg-rain";
        break;
      case "Sand":
        styles += " bg-sand";
        break;
      case "Smoke":
        styles += " bg-smoke";
        break;
      case "Snow":
        styles += " bg-snow";
        break;
      case "Squall":
        styles += " bg-rain";
        break;
      case "Thunderstorm":
        styles += " bg-thunderstorm";
        break;
      case "Tornado":
        styles += " bg-tornado";
        break;
      default:
        styles += " bg-gray-700";
    }
  } else {
    styles += " bg-gray-700";
  }

  return styles;
}

export default useGetBackground;
