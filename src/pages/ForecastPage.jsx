// React
import { useEffect } from "react";

// React-Redux
import { useSelector, useDispatch } from "react-redux";

// Async Thunks
import { fetchForecastWeather } from "../store";

// Moment.js
import moment from "moment-timezone";

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

  useEffect(() => {
    dispatch(fetchForecastWeather(coords));
  }, []);

  let styles =
    "current-weather flex flex-col justify-center items-center h-dvh";

  let forecastDisplay;
  if (forecastWeather.isLoading) {
    forecastDisplay = <p>Loading....</p>;
  } else if (forecastWeather.error) {
    forecastDisplay = <p>ERROR: {forecastWeather.error.message}</p>;
  } else {
    forecastDisplay = forecastWeather.data.list.map((snapshot) => {
      return (
        <li key={snapshot.dt}>
          {moment.unix(snapshot.dt).tz(timezone).format("h:mm:ss a")}
          <ul>
            <li>{snapshot.weather[0].main}</li>
            <li>{snapshot.weather[0].description}</li>
          </ul>
        </li>
      );
    });
  }

  return (
    <div className={styles}>
      <h1 className="mb-5">Forecast Page (On its way!)</h1>
      <ul>{forecastDisplay}</ul>
    </div>
  );
}
