// React-Redux Hooks
import { useSelector } from "react-redux";
// Custom Hooks
import useGetBackground from "../hooks/use-get-background";
// My Components
import WeatherDataDisplay from "../components/WeatherDataDisplay";
import convertWeatherData from "../utils/convertWeatherData";

function CurrentPage() {
  // Dynamic background
  let styles =
    "current-weather flex flex-col justify-center items-center w-dvw";
  styles += useGetBackground();

  // From weatherDataSlice
  const weatherData = useSelector((state) => state.weatherData);

  let weatherDataDisplay;
  if (weatherData.isLoading) {
    weatherDataDisplay = <p>Loading....</p>;
  } else if (weatherData.error) {
    weatherDataDisplay = <p>ERROR: {weatherData.error.message}</p>;
  } else {
    const data = convertWeatherData(weatherData);
    weatherDataDisplay = <WeatherDataDisplay data={data} />;
  }

  return <div className={styles}>{weatherDataDisplay}</div>;
}

export default CurrentPage;
