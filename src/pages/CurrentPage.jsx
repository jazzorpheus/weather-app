// React-Redux
import { useSelector } from "react-redux";

// Custom Hooks
import useGetBackground from "../hooks/use-get-background";

// My Components
import CurrentWeatherDisplay from "../components/CurrentWeatherDisplay";

// Utilities
import convertWeatherData from "../utils/convertWeatherData";

export default function CurrentPage() {
  // Dynamic background
  let styles =
    "current-weather flex flex-col justify-center items-center w-dvw";
  styles += useGetBackground();

  // Redux store
  const currentWeather = useSelector((state) => state.currentWeather);

  let currentDisplay;
  if (currentWeather.isLoading) {
    currentDisplay = <p>Loading....</p>;
  } else if (currentWeather.error) {
    currentDisplay = <p>ERROR: {currentWeather.error.message}</p>;
  } else {
    const data = convertWeatherData(currentWeather.data);
    currentDisplay = <CurrentWeatherDisplay data={data} />;
  }

  return <div className={styles}>{currentDisplay}</div>;
}
