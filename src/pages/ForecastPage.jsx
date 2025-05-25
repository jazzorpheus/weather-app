// React
import { useEffect, useRef, useMemo } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Icons
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

// Local Hooks
import useGetBackground from "../hooks/use-get-background";
import useGetIcon from "../hooks/use-get-icon";

// Local Utilites
import createReducer from "../utils/helpers/forecastTableHelpers";

// Local Components
import ForecastTable from "../components/ForecastTable";
import IconCell from "../components/IconCell";

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
  const bgImage = useGetBackground();
  const Icon = useGetIcon(currentWeather.data);

  // Fetch forecast based on current coords
  useEffect(() => {
    if (coords) dispatch(fetchForecastWeather(coords));
  }, [coords, dispatch]);

  // Table Ref
  const tableContainerRef = useRef(null);

  // Scroll page to left
  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  // Scroll page to right
  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

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
    return (
      <div className="flex justify-center items-center h-dvh w-dvw bg-gradient-to-t from-zinc-700 to-blue-400">
        <p>Loading...</p>
      </div>
    );
  }

  // Display error message if fetching forecast data fails
  if (forecastWeather.error) {
    return (
      <div className="flex justify-center items-center h-dvh w-dvw bg-gradient-to-t from-zinc-700 to-blue-400">
        <p>ERROR: {forecastWeather.error.message}</p>
      </div>
    );
  }

  return (
    <div className={`flex justify-center h-dvh w-dvw ${bgImage}`}>
      <button
        onClick={scrollLeft}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowLeft className="scale-150" />
      </button>
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
      <button
        onClick={scrollRight}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowRight className="scale-150" />
      </button>
    </div>
  );
}
