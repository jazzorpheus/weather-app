// React Hooks
import { useEffect, useState } from "react";

// React-Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Async Thunks
import { fetchCoords } from "../store/thunks/fetchCoords";
import { fetchWeatherData } from "../store/thunks/fetchWeatherData";

// Action Creator Functions
import { updateMarker } from "../store";

// Mapbox GL
import mapboxgl from "mapbox-gl";

// My Components
import WeatherDataDisplay from "./WeatherDataDisplay";

function LocationSearch() {
  console.log("RENDERING LOCATION SEARCH COMPONENT");

  // Local state for form
  const [searchTerm, setSearchTerm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State from store
  //
  // From mapSlice
  const mapObj = useSelector((state) => state.map.mapObj);
  const marker = useSelector((state) => state.map.marker);
  // From coordsSlice
  const coords = useSelector((state) => state.coords);
  // From weatherDataSlice
  const weatherData = useSelector((state) => state.weatherData);

  // Dispatch function
  const dispatch = useDispatch();

  // When coords change:
  //  - get new weather data
  //  - re-center map if change comes from form search
  //  - move map marker to new coords
  useEffect(() => {
    if (coords.coords[0]) {
      dispatch(fetchWeatherData(coords.coords));
      if (formSubmitted) {
        mapObj.setCenter(coords.coords);
        mapObj.setZoom(9);
        setFormSubmitted(false);
      }
      if (marker) {
        marker.remove();
        dispatch(
          updateMarker(
            new mapboxgl.Marker({ draggable: false, scale: 1 })
              .setLngLat(coords.coords)
              .addTo(mapObj)
          )
        );
      }
    }
  }, [coords.coords]);

  // Hijack control of form input value
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  // Fetch coords using search term (triggers fetchWeatherData once coords change)
  // Reset text input
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(fetchCoords(searchTerm));
    setSearchTerm("");
    setFormSubmitted(true);
  };

  let weatherDataDisplay;
  if (weatherData.isLoading) {
    weatherDataDisplay = <p>Loading....</p>;
  } else if (weatherData.error) {
    weatherDataDisplay = <p>ERROR: {weatherData.error.message}</p>;
  } else {
    const data = [
      { name: "Location", value: weatherData.data.name, units: "" },
      { name: "Main", value: weatherData.data.weather[0].main, units: "" },
      {
        name: "Description",
        value: weatherData.data.weather[0].description,
        units: "",
      },
      {
        name: "Temperature",
        value: (weatherData.data.main.temp - 273.15).toFixed(1),
        units: "°C",
      },
      {
        name: "Feels like",
        value: (weatherData.data.main.feels_like - 273.15).toFixed(1),
        units: "°C",
      },
      { name: "Humidity", value: weatherData.data.main.humidity, units: "%" },
      { name: "Wind speed", value: weatherData.data.wind.speed, units: "m/s" },
      {
        name: "Wind direction",
        value: weatherData.data.wind.deg,
        units: "deg",
      },
    ];
    weatherDataDisplay = <WeatherDataDisplay data={data} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mt-3">
          <input
            className="text-black rounded pt-1 ps-1"
            type="text"
            placeholder="Enter location name"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="bg-gray-900 mt-3 mb-3" type="submit">
            Get Weather
          </button>
        </div>
      </form>
      {weatherDataDisplay}
    </>
  );
}

export default LocationSearch;
