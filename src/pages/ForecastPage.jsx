// React
import { useEffect, useRef, useMemo } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Utilites
import convertWeatherData from "../utils/data-conversions/convertWeatherData";
import tempToColor from "../utils/tempToColor";

// Moment.js
import moment from "moment-timezone";

// Icons
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";

// Local Components
import IconCell from "../components/IconCell";

export default function ForecastPage() {
  // Get client timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Dispatch function
  const dispatch = useDispatch();

  // State from store
  const coords = useSelector((state) => state.coords.coords);
  const forecastWeather = useSelector((state) => state.forecastWeather);

  useEffect(() => {
    dispatch(fetchForecastWeather(coords));
  }, [coords, dispatch]);

  // If no placename, use coords for heading
  const latLng = (
    <span>
      Lat: {coords[1].toFixed(2)} | Lon: {coords[0].toFixed(2)}
    </span>
  );

  // Table Ref
  const tableContainerRef = useRef(null);

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const tableRowsByType = useMemo(() => {
    if (!forecastWeather.data?.list) return null;

    const list = forecastWeather.data.list;

    return list.reduce(
      (acc, timeslot) => {
        const converted = convertWeatherData(timeslot);

        const timeString = moment
          .unix(timeslot.dt)
          .tz(timezone)
          .format("ddd HH:mm");

        Object.keys(acc).forEach((key, idx) => {
          if (key === "timestamps") {
            acc.timestamps.push(
              <td className="weather-stat bg-gray-900" key={timeslot.dt}>
                {timeString}
              </td>
            );
          } else if (key === "icons") {
            acc.icons.push(<IconCell key={timeslot.dt} dataPoint={timeslot} />);
          } else if (key === "temperature") {
            const tempColor = tempToColor(converted[2].value, 0.6);
            acc.temperature.push(
              <td
                style={{ backgroundColor: tempColor }}
                className={"weather-stat py-2"}
                key={timeslot.dt}
              >
                {converted[idx].value}
                {converted[idx].units}
              </td>
            );
          } else if (key === "feelsLike") {
            const feelsLikeColor = tempToColor(converted[3].value, 0.6);
            acc.feelsLike.push(
              <td
                style={{ backgroundColor: feelsLikeColor }}
                className="weather-stat py-2"
                key={timeslot.dt}
              >
                {converted[idx]["value"]}
                {converted[idx]["units"]}
              </td>
            );
          } else if (key === "windDirection") {
            acc.windDirection.push(
              <td className="weather-stat py-2" key={timeslot.dt}>
                <TiLocationArrow className={converted[8].styles} />
                {converted[8].value}
              </td>
            );
          } else {
            acc[key].push(
              <td className="weather-stat py-2" key={timeslot.dt}>
                {converted[idx]["value"]}
                {converted[idx]["units"]}
              </td>
            );
          }
        });

        return acc;
      },
      {
        timestamps: [],
        icons: [],
        temperature: [],
        feelsLike: [],
        clouds: [],
        humidity: [],
        windSpeed: [],
        windGust: [],
        windDirection: [],
        visibility: [],
      }
    );
  }, [forecastWeather.data?.list, timezone]);

  if (forecastWeather.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-dvh w-dvw  bg-gradient-to-t from-zinc-700 to-blue-400">
        <p>Loading...</p>
      </div>
    );
  }

  if (forecastWeather.error) {
    return (
      <div className="flex justify-center items-center h-dvh w-dvw bg-gradient-to-t from-zinc-700 to-blue-400">
        <p>ERROR: {forecastWeather.error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-dvh w-dvw bg-gradient-to-t from-zinc-700 to-blue-400">
      <button
        onClick={scrollLeft}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowLeft className="scale-150" />
      </button>
      {/* TABLE START */}
      <div
        className="table-container relative overflow-x-scroll"
        ref={tableContainerRef}
      >
        <h1 className="text-3xl font-bold text-center sticky left-0 mb-5">
          {forecastWeather.data?.city?.name || latLng}
        </h1>
        <table className="rounded">
          <tbody>
            <tr className="text-center sticky top-0 z-10">
              {tableRowsByType.timestamps}
            </tr>
            <tr className="text-center">{tableRowsByType.icons}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Temperature</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.temperature}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Feels like temperature</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.feelsLike}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Cloud cover</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.clouds}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2 className="opacity-100">Humidity</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.humidity}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Wind speed</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.windSpeed}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Wind gust</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.windGust}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Wind direction</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.windDirection}</tr>
            <tr>
              <th
                className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
                colSpan={2}
              >
                <h2>Visibility</h2>
              </th>
            </tr>
            <tr className="text-center">{tableRowsByType.visibility}</tr>
          </tbody>
        </table>
      </div>

      {/* TABLE END */}
      <button
        onClick={scrollRight}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowRight className="scale-150" />
      </button>
    </div>
  );
}
