// React-Redux Hooks
import { useSelector } from "react-redux";

function useGetBackground() {
  const currentWeather = useSelector((state) => state.currentWeather);
  if (currentWeather.data) {
    const { main } = currentWeather.data.weather[0];
    const { description } = currentWeather.data.weather[0];
    switch (main) {
      case "Ash":
        return " bg-mist";
      case "Clear":
        return " bg-clear";
      case "Clouds":
        switch (description) {
          case "few clouds":
            return " bg-clouds-few";
          case "scattered clouds":
            return " bg-clouds-scattered";
          case "broken clouds":
            return " bg-clouds-broken";
          case "overcast clouds":
            return " bg-clouds-overcast";
          default:
            return " bg-gray-700";
        }
      case "Drizzle":
        return " bg-rain";
      case "Dust":
        return " bg-mist";
      case "Fog":
        return " bg-mist";
      case "Haze":
        return " bg-haze";
      case "Mist":
        return " bg-mist";
      case "Rain":
        return " bg-rain";
      case "Sand":
        return " bg-sand";
      case "Smoke":
        return " bg-smoke";
      case "Snow":
        return " bg-snow";
      case "Squall":
        return " bg-rain";
      case "Thunderstorm":
        return " bg-thunderstorm";
      case "Tornado":
        return " bg-tornado";
      default:
        return " bg-gray-700";
    }
  } else {
    return " bg-gray-700";
  }
}

export default useGetBackground;
