// React-Redux
import { useSelector } from "react-redux";

// Custom Hooks
import useGetBackground from "../hooks/use-get-background";
import useGetIcon from "../hooks/use-get-icon";

// Local Components
import CurrentWeatherDisplay from "../components/CurrentWeatherDisplay";

// Local Utilities
import convertWeatherData from "../utils/data-conversions/convertWeatherData";

export default function CurrentPage() {
  // Redux store
  const currentWeather = useSelector((state) => state.currentWeather);

  // Dynamic background
  let styles =
    "current-weather flex flex-col justify-center items-center w-dvw";
  styles += useGetBackground();

  // Get icon matching weather description
  const weatherIcon = useGetIcon(currentWeather.data);

  // Convert current weather data to usable format
  const convertedWeatherData = convertWeatherData(currentWeather.data);

  // Show loading while fetching current data
  if (currentWeather.isLoading) {
    return <p>Loading....</p>;
  }

  // Display error message if fetching current data fails
  if (currentWeather.error) {
    return <p>ERROR: {currentWeather.error.message}</p>;
  }

  return (
    <div className={styles}>
      <CurrentWeatherDisplay
        currentData={convertedWeatherData}
        currentIcon={weatherIcon}
      />
    </div>
  );
}
