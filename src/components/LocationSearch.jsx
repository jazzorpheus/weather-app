// React Hooks
import { useState, useEffect } from "react";
// React-Redux Hooks
import { useDispatch, useSelector } from "react-redux";
// Custom Hooks
import useGetBackground from "../hooks/use-get-background";
// Async Thunks
import { fetchWeatherData } from "../store/thunks/fetchWeatherData";
// Action Creator Functions
import { updateMarker } from "../store";
// Mapbox GL
import mapboxgl from "mapbox-gl";
// My Components
import WeatherDataDisplay from "./WeatherDataDisplay";
import convertWeatherData from "../utils/convertWeatherData";
import SearchModal from "./SearchModal";

function LocationSearch() {
  // Dynamic background
  let styles =
    "location-search flex flex-col justify-center items-center h-full";
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

  return (
    <div className={styles}>
      {showForm && (
        <SearchModal
          showForm={showForm}
          toggleShow={toggleShowForm}
          toggleSubmitted={toggleFormSubmitted}
        />
      )}
      <form className="flex flex-col items-center my-3">
        <input
          className="text-black border-2 border-gray-700 rounded pt-1 ps-1"
          type="text"
          placeholder="Search For Location"
          value={""}
          onChange={(e) => e.target.value}
          onClick={() => setshowForm(true)}
        />
      </form>
      {weatherDataDisplay}
    </div>
  );
}

export default LocationSearch;
