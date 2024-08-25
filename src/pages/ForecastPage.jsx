// React
import { useEffect, useRef } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Custom hooks
import useGetBackground from "../hooks/use-get-background";
import useGetIcon from "../hooks/use-get-icon";

// Utilites
import convertWeatherData from "../utils/data-conversions/convertWeatherData";
import tempToColor from "../utils/tempToColor";

// Moment.js
import moment from "moment-timezone";

// Icons
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";

// Universally Unique Identifiers for <td> arrays
import { v4 as uuid } from "uuid";
import IconCell from "../components/IconCell";

export default function ForecastPage() {
  // Get client timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Dispatch function
  const dispatch = useDispatch();

  // State from store
  const coords = useSelector((state) => state.coords.coords);
  const currentWeather = useSelector((state) => state.currentWeather);
  const forecastWeather = useSelector((state) => state.forecastWeather);

  // if (forecastWeather && forecastWeather.data) {
  //   console.log("FORECAST DATA:", forecastWeather.data);
  // }

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

  let foreLoadOrErr;
  let timestamps = [];
  let icons = [];
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
    foreLoadOrErr = <p>Loading...</p>;
  } else if (forecastWeather.error) {
    styles += " items-center";
    foreLoadOrErr = <p>ERROR: {forecastWeather.error.message}</p>;
  } else {
    // ***********************************************************************
    const forecast = forecastWeather.data?.list; // || [];
    forecast.forEach((item) => {
      const convertedItem = convertWeatherData(item);
      // console.log("ITEM:", convertedItem);
      timestamps.push(
        <td className="weather-stat bg-gray-900" key={uuid()}>
          {moment.unix(item.dt).tz(timezone).format("ddd HH:mm")}
        </td>
      );
      icons.push(<IconCell key={uuid()} dataPoint={item} />);
      const tempColor = tempToColor(convertedItem[2].value, 0.6);
      let tempStyle = {
        backgroundColor: tempColor,
      };
      temperature.push(
        <td style={tempStyle} className="weather-stat py-2" key={uuid()}>
          {convertedItem[2].value}
          {convertedItem[2].units}
        </td>
      );
      const feelsLikeColor = tempToColor(convertedItem[2].value, 0.6);
      let feelsLikeStyle = {
        backgroundColor: feelsLikeColor,
      };
      feelsLike.push(
        <td style={feelsLikeStyle} className="weather-stat py-2" key={uuid()}>
          {convertedItem[3].value}
          {convertedItem[3].units}
        </td>
      );
      clouds.push(
        <td className="weather-stat py-2" key={uuid()}>
          {convertedItem[4].value}
          {convertedItem[4].units}
        </td>
      );
      humidity.push(
        <td className="weather-stat py-2" key={uuid()}>
          {convertedItem[5].value}
          {convertedItem[5].units}
        </td>
      );
      windSpeed.push(
        <td className="weather-stat py-2" key={uuid()}>
          {convertedItem[6].value}
          {convertedItem[6].units}
        </td>
      );
      windGust.push(
        <td className="weather-stat py-2" key={uuid()}>
          {convertedItem[7].value}
          {convertedItem[7].units}
        </td>
      );
      windDirection.push(
        <td className="weather-stat py-2" key={uuid()}>
          <TiLocationArrow className={convertedItem[8].styles} />
          {convertedItem[8].value}
        </td>
      );
      visibility.push(
        <td className="weather-stat py-2" key={uuid()}>
          {convertedItem[9].value}
          {convertedItem[9].units}
        </td>
      );
    });
    latLng = (
      <span>
        Latitude: {coords[1].toFixed(2)} | Longitude: {coords[0].toFixed(2)}
      </span>
    );
  }

  const currentIcon = useGetIcon(currentWeather.data);
  let currLoadOrErr;
  if (currentWeather.isLoading) {
    currLoadOrErr = <p>Loading...</p>;
  } else if (currentWeather.error) {
    currLoadOrErr = <p>ERROR: {currentWeather.error.message}</p>;
  } else {
    currLoadOrErr = false;
  }

  return (
    <div className={styles}>
      <button
        onClick={scrollLeft}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-10 p-2"
      >
        <FaCircleArrowLeft className="scale-150" />
      </button>
      {foreLoadOrErr ? (
        foreLoadOrErr
      ) : (
        <div
          className="table-container relative overflow-x-scroll"
          ref={tableContainerRef}
        >
          <h1 className="text-3xl font-bold text-center sticky left-0">
            {forecastWeather.data?.city?.name || latLng}
          </h1>
          <div className="flex justify-center sticky left-0">{currentIcon}</div>
          <h2 className="text-2xl font-bold text-center sticky left-0 mb-2">
            {currLoadOrErr
              ? currLoadOrErr
              : currentWeather.data.weather[0].description
                  .charAt(0)
                  .toUpperCase() +
                  currentWeather.data.weather[0].description.slice(1) || latLng}
          </h2>
          <table className="rounded">
            <tbody>
              {/* <tr> */}
              {/* <th */}
              {/* className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded" */}
              {/* colSpan={2} */}
              {/* > */}
              {/* <span> */}
              {/* <h2>Time</h2> */}
              {/* </span> */}
              {/* </th> */}
              {/* </tr> */}
              <tr className="text-center sticky top-0 z-10">{timestamps}</tr>
              <tr className="text-center">{icons}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Temperature</h2>
                </th>
              </tr>
              <tr className="text-center">{temperature}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Feels like temperature</h2>
                </th>
              </tr>
              <tr className="text-center">{feelsLike}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Cloud cover</h2>
                </th>
              </tr>
              <tr className="text-center">{clouds}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2 className="opacity-100">Humidity</h2>
                </th>
              </tr>
              <tr className="text-center">{humidity}</tr>

              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Wind speed</h2>
                </th>
              </tr>
              <tr className="text-center">{windSpeed}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Wind gust</h2>
                </th>
              </tr>
              <tr className="text-center">{windGust}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Wind direction</h2>
                </th>
              </tr>
              <tr className="text-center">{windDirection}</tr>
              <tr>
                <th
                  className="arrow-right sticky left-0 bg-gradient-to-r from-blue-800 to-sky-300 rounded"
                  colSpan={2}
                >
                  <h2>Visibility</h2>
                </th>
              </tr>
              <tr className="text-center">{visibility}</tr>
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
