// React Hooks
import { useEffect, useState } from "react";

// React-Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Custom Hooks
import useGetBackground from "../hooks/use-get-background";

// Async Thunks
import { fetchCoords } from "../store/thunks/fetchCoords";
import { fetchWeatherData } from "../store/thunks/fetchWeatherData";

// Action Creator Functions
import { updateMarker } from "../store";

// Mapbox GL
import mapboxgl from "mapbox-gl";

// My Components
import WeatherDataDisplay from "./WeatherDataDisplay";
import convertWeatherData from "../utils/convertWeatherData";

function LocationSearch() {
  console.log("RENDERING LOCATION SEARCH COMPONENT");

  // Dynamic background
  let styles = "location-search flex flex-col items-center";
  styles += useGetBackground();

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
        // mapObj.setCenter(coords.coords);
        // mapObj.setZoom(9);
        mapObj.flyTo({
          center: coords.coords,
          essential: true,
        });
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
    // Remove focus from input element
    document.querySelector('input[name="searchTerm"]').blur();
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     // Prevent default behavior of submitting the form
  //     event.preventDefault();
  //     console.log("PRESSED ENTERRRRRRRRRR");
  //     // Manually trigger form submission
  //     // event.target.form.dispatchEvent(new Event("submit"));
  //     handleSubmit(new Event("submit"));
  //   }
  // };

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
      <form className="flex flex-col items-center mt-3" onSubmit={handleSubmit}>
        <input
          className="text-black border-2 border-gray-700 rounded pt-1 ps-1"
          name="searchTerm"
          type="text"
          placeholder="Enter location name"
          value={searchTerm}
          onChange={handleInputChange}
          // onKeyDown={handleKeyDown}
        />
        <button className="bg-gray-900 mt-3 mb-3" type="submit">
          Get Weather
        </button>
      </form>
      {weatherDataDisplay}
    </div>
  );
}

export default LocationSearch;
