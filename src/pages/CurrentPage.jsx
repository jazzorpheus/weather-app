// React-Redux
import { useSelector } from "react-redux";

// Custom Hooks
import getBackgroundClass from "../utils/style-helpers/getBackgroundClass";
import getWeatherIcon from "../utils/style-helpers/getWeatherIcon";

// Local Components
import CurrentWeatherDisplay from "../components/current/CurrentWeatherDisplay";

// Local Utilities
import convertWeatherData from "../utils/data-conversions/convertWeatherData";

export default function CurrentPage() {
  // Redux store
  const coords = useSelector((state) => state.coords.coords);
  const currentWeather = useSelector((state) => state.currentWeather);

  // Container base styles
  let styles =
    "current-weather flex flex-col justify-center items-center w-dvw";

  // Get background matching weather description
  styles += getBackgroundClass(currentWeather.data);

  // Get icon matching weather description
  const weatherIcon = getWeatherIcon(currentWeather.data);

  // Convert current weather data to usable format
  const convertedWeatherData = convertWeatherData(currentWeather.data);

  // Show loading while fetching current data
  if (currentWeather.isLoading) {
    return <p className={styles}>Loading....</p>;
  }

  // Display error message if fetching current data fails
  if (currentWeather.error) {
    return <p className={styles}>ERROR: {currentWeather.error.message}</p>;
  }

  return (
    <div className={styles}>
      <CurrentWeatherDisplay
        coords={coords}
        currentData={convertedWeatherData}
        currentIcon={weatherIcon}
      />
    </div>
  );
}
