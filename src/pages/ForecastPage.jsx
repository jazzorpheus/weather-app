// React
import { useEffect, useRef } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

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

  const forecastContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchForecastWeather(coords));
  }, [coords]);

  let styles =
    "forecast-container flex flex-col justify-center h-dvh w-dvw overflow-auto";

  const scrollLeft = () => {
    if (forecastContainerRef.current) {
      forecastContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (forecastContainerRef.current) {
      forecastContainerRef.current.scrollBy({
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
        <td key={uuid()}>
          {moment.unix(item.dt).tz(timezone).format("HH:mm")}
        </td>
      );
      temperature.push(<td key={uuid()}>{item.main.temp}</td>);
      feelsLike.push(<td key={uuid()}>{item.main.feels_like}</td>);
      clouds.push(<td key={uuid()}>{item.clouds.all}</td>);
      windDirection.push(<td key={uuid()}>{item.wind.deg}</td>);
      windSpeed.push(<td key={uuid()}>{item.wind.speed}</td>);
      windGust.push(<td key={uuid()}>{item.wind.gust}</td>);
      visibility.push(<td key={uuid()}>{item.visibility}</td>);
      humidity.push(<td key={uuid()}>{item.main.humidity}</td>);
      humidity.push(<td key={uuid()}>{item.main.humidity}</td>);
    });
  }

  return (
    <div className={styles} ref={forecastContainerRef}>
      {loadingOrError ? (
        loadingOrError
      ) : (
        <table className="relative w-[4000px] border">
          <button
            onClick={scrollLeft}
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
          >
            <FaCircleArrowLeft className="scale-150" />
          </button>
          <tbody>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Time
              </th>
            </tr>
            <tr className="text-center">{timestamps}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Temperature
              </th>
            </tr>
            <tr className="text-center">{temperature}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Feels like temperature
              </th>
            </tr>
            <tr className="text-center">{feelsLike}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Clouds
              </th>
            </tr>
            <tr className="text-center">{clouds}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Wind direction
              </th>
            </tr>
            <tr className="text-center">{windDirection}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Wind speed
              </th>
            </tr>
            <tr className="text-center">{windSpeed}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Wind gust
              </th>
            </tr>
            <tr className="text-center">{windGust}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Visibility
              </th>
            </tr>
            <tr className="text-center">{visibility}</tr>
            <tr>
              <th className="sticky left-0" colSpan={2}>
                Humidity
              </th>
            </tr>
            <tr className="text-center">{humidity}</tr>
          </tbody>
          <button
            onClick={scrollRight}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
          >
            <FaCircleArrowRight className="scale-150" />
          </button>
        </table>
      )}
    </div>
  );
}
