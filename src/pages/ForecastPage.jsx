// React
import { useEffect, useRef, useMemo } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Custom Hooks
import getBackgroundClass from "../utils/style-helpers/getBackgroundClass";
import getWeatherIcon from "../utils/style-helpers/getWeatherIcon";

// Local Utilites
import createReducer from "../utils/forecast-helpers/forecastTableHelpers";
import horizontalScroll from "../utils/forecast-helpers/horizontalScroll";

// Local Components
import ForecastTable from "../components/ForecastTable";
import HorizontalScrollButton from "../components/HorizontalScrollButton";

export default function ForecastPage() {
  // Get client timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Dispatch function
  const dispatch = useDispatch();

  // State from store
  const coords = useSelector((state) => state.coords.coords);
  const forecastWeather = useSelector((state) => state.forecastWeather);
  const currentWeather = useSelector((state) => state.currentWeather);

  // Custom Hooks
  let styles = "flex justify-center h-dvh w-dvw";
  styles += getBackgroundClass(currentWeather.data);
  const Icon = getWeatherIcon(currentWeather.data);

  // Fetch forecast based on current coords
  useEffect(() => {
    if (coords) dispatch(fetchForecastWeather(coords));
  }, [coords, dispatch]);

  // Table Ref
  const tableContainerRef = useRef(null);

  // Generate and memoize table data
  const tableRowsByType = useMemo(() => {
    if (!forecastWeather.data?.list) return null;

    const list = forecastWeather.data.list;

    // Initial accumulator for reducer
    const initialAcc = {
      timestamps: [],
      icons: [],
      temperature: [],
      feelsLike: [],
      cloudCover: [],
      humidity: [],
      windSpeed: [],
      windGust: [],
      windDirection: [],
      visibility: [],
    };

    // Callback to be passed to reduce()
    const reducer = createReducer(timezone);

    return list.reduce(reducer, initialAcc);
  }, [forecastWeather.data?.list, timezone]);

  // Show loading while fetching forecast data
  if (forecastWeather.isLoading) {
    styles += " items-center";
    return (
      <div className={styles}>
        <p>Loading...</p>
      </div>
    );
  }

  // Display error message if fetching forecast data fails
  if (forecastWeather.error) {
    styles += " items-center";
    return (
      <div className={styles}>
        <p>ERROR: {forecastWeather.error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles}>
      <HorizontalScrollButton
        direction="left"
        scrollX={() => horizontalScroll(tableContainerRef, "left")}
      />
      <div
        className="table-container relative overflow-x-scroll"
        ref={tableContainerRef}
      >
        <div className="flex flex-col items-center text-2xl text-center sticky left-0 mb-5">
          <h1 className="text-3xl font-bold">
            {forecastWeather.data?.city?.name ||
              (coords && (
                <span>
                  Lat: {coords[1].toFixed(2)} | Lon: {coords[0].toFixed(2)}
                </span>
              ))}
          </h1>
          <span>{Icon}</span>
          <h2>{currentWeather.data?.weather[0].description}</h2>
        </div>
        <ForecastTable forecastRowsData={tableRowsByType} />
      </div>
      <HorizontalScrollButton
        direction="right"
        scrollX={() => horizontalScroll(tableContainerRef, "right")}
      />
    </div>
  );
}
