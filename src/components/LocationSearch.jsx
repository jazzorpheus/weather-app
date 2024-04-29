// React Hooks
import { useState, useEffect, useRef } from "react";
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
  console.log("RENDERING LOCATION SEARCH COMPONENT");

  // Dynamic background
  let styles = "location-search flex flex-col items-center";
  styles += useGetBackground();

  const [showForm, setshowForm] = useState(false);
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

  const toggleFormSubmitted = () => {
    setFormSubmitted(!formSubmitted);
  };

  //  - Get new weather data
  //  - Re-center map if change comes from form search
  //  - Move map marker to new coords
  const getNewLocationData = () => {
    if (coords.coords[0]) {
      dispatch(fetchWeatherData(coords.coords));
      if (formSubmitted) {
        mapObj.flyTo({
          center: coords.coords,
          zoom: 9,
          essential: true,
        });
        toggleFormSubmitted();
        setshowForm(false);
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
  };

  // When coords change
  useEffect(() => {
    getNewLocationData();
  }, [coords.coords]);

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
        <SearchModal toggle={toggleFormSubmitted} showForm={showForm} />
      )}
      <form className="flex flex-col items-center my-3">
        <input
          className="text-black border-2 border-gray-700 rounded pt-1 ps-1"
          type="text"
          placeholder="Enter location name"
          onClick={() => setshowForm(true)}
        />
      </form>
      {weatherDataDisplay}
    </div>
  );
}

export default LocationSearch;
