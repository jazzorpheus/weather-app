// React
import { useEffect, useRef } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Custom hooks
import useGetBackground from "../hooks/use-get-background";

// Moment.js
import moment from "moment-timezone";

// Icons
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

// Universally Unique Identifiers for <td> arrays
import { v4 as uuid } from "uuid";

export default function ForecastPage() {
  // Get client timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Dispatch function
  const dispatch = useDispatch();

  // State from store
  const coords = useSelector((state) => state.coords.coords);
  const forecastWeather = useSelector((state) => state.forecastWeather);

  if (forecastWeather && forecastWeather.data) {
    console.log(forecastWeather.data);
  }

  const tableContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchForecastWeather(coords));
  }, [coords]);

  let styles = "flex flex-col justify-center h-dvh w-dvw";
  styles += useGetBackground();

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

  let loadingOrError;
  let timestamps = [];
  let temperature = [];
  let feelsLike = [];
  let clouds = [];
  let windDirection = [];
  let windSpeed = [];
  let windGust = [];
  let visibility = [];
  let humidity = [];
  let latLng;
  if (forecastWeather.isLoading) {
    styles += " items-center";
    loadingOrError = <p>Loading...</p>;
  } else if (forecastWeather.error) {
    styles += " items-center";
    loadingOrError = <p>ERROR: {forecastWeather.error.message}</p>;
  } else {
    // ***********************************************************************
    const forecast = forecastWeather.data.list;
    forecast.forEach((item) => {
      timestamps.push(
        <td className="weather-stat bg-amber-500" key={uuid()}>
          {moment.unix(item.dt).tz(timezone).format("HH:mm")}
        </td>
      );
      temperature.push(
        <td className="weather-stat  py-2" key={uuid()}>
          {item.main.temp.toFixed(1)}°C
        </td>
      );
      feelsLike.push(
        <td className="weather-stat py-2" key={uuid()}>
          {item.main.feels_like.toFixed(1)}°C
        </td>
      );
      clouds.push(
        <td className="weather-stat py-2" key={uuid()}>
          {item.clouds.all}%
        </td>
      );
      windDirection.push(
        <td className="weather-stat py-2" key={uuid()}>
          {item.wind.deg}°
        </td>
      );
      windSpeed.push(
        <td className="weather-stat py-2" key={uuid()}>
          {(60 ** 2 * (item.wind.speed / 1609.34)).toFixed(1)}mph
        </td>
      );
      windGust.push(
        <td className="weather-stat py-2" key={uuid()}>
          {(60 ** 2 * (item.wind.gust / 1609.34)).toFixed(1)}mph
        </td>
      );
      visibility.push(
        <td className="weather-stat py-2" key={uuid()}>
          {item.visibility / 1000}km
        </td>
      );
      humidity.push(
        <td className="weather-stat py-2" key={uuid()}>
          {item.main.humidity}%
        </td>
      );
    });
    latLng = (
      <span>
        Latitude: {coords[1].toFixed(2)} | Longitude: {coords[0].toFixed(2)}
      </span>
    );
  }

  return (
    <div className={styles}>
      <button
        onClick={scrollLeft}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowLeft className="scale-150" />
      </button>
      {loadingOrError ? (
        loadingOrError
      ) : (
        <div
          className="table-container relative overflow-x-scroll"
          ref={tableContainerRef}
        >
          <h1 className="text-3xl font-bold text-center sticky left-0 mb-5">
            {forecastWeather.data.city?.name || latLng}
          </h1>
          <table className=" rounded">
            <tbody>
              <tr className="bg-blue-500 w-[4000px]">
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <span>
                    <h2>Time</h2>
                  </span>
                </th>
              </tr>
              <tr className="text-center sticky top-0 z-10">{timestamps}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Temperature</h2>
                </th>
              </tr>
              <tr className="text-center">{temperature}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Feels like temperature</h2>
                </th>
              </tr>
              <tr className="text-center">{feelsLike}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Cloud cover</h2>
                </th>
              </tr>
              <tr className="text-center">{clouds}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Wind direction</h2>
                </th>
              </tr>
              <tr className="text-center">{windDirection}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Wind speed</h2>
                </th>
              </tr>
              <tr className="text-center">{windSpeed}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Wind gust</h2>
                </th>
              </tr>
              <tr className="text-center">{windGust}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Visibility</h2>
                </th>
              </tr>
              <tr className="text-center">{visibility}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-blue-500 rounded"
                  colSpan={2}
                >
                  <h2>Humidity</h2>
                </th>
              </tr>
              <tr className="text-center">{humidity}</tr>
            </tbody>
          </table>
          <button
            onClick={scrollRight}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-10 p-2"
          >
            <FaCircleArrowRight className="scale-150" />
          </button>
        </div>
      )}
    </div>
  );
}
