// React
import { useState, useEffect } from "react";

// React Router
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Action creator functions
import { updateMarker } from "./store/index.js";

// Async Thunks
import { fetchWeatherData } from "./store/thunks/fetchWeatherData";

// My Components
import Navbar from "./components/Navbar.jsx";
import SearchModal from "./components/SearchModal";

// Custom Hooks
import useClientLocation from "./hooks/use-client-location.js";

// Mapbox GL
import mapboxgl from "mapbox-gl";

export default function Root() {
  // Get client geolocation and dispatch to store
  useClientLocation();

  // Get current URL path to check for /map [see below]
  const currentPath = useLocation();

  // Dispatch function
  const dispatch = useDispatch();

  // From coordsSlice
  const coords = useSelector((state) => state.coords);

  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State from store
  //
  // From mapSlice
  const mapObj = useSelector((state) => state.map.mapObj);
  const marker = useSelector((state) => state.map.marker);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

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
        // If map displaying, fly to location when form submitted
        if (currentPath.pathname === "/map") {
          mapObj.flyTo({
            center: coords.coords,
            zoom: 9,
            essential: true,
          });
        }
        toggleFormSubmitted();
        setShowForm(false);
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

  let onLandingPage;
  if (currentPath.pathname !== "/") {
    onLandingPage = false;
  } else {
    onLandingPage = true;
  }

  return (
    <div className="flex flex-col items-center h-screen">
      {!onLandingPage && (
        <header className="absolute z-10">
          {showForm ? (
            <SearchModal
              showForm={showForm}
              toggleShow={toggleShowForm}
              toggleSubmitted={toggleFormSubmitted}
            />
          ) : (
            <form className="flex flex-col items-center my-3">
              <input
                className="text-black border-2 border-gray-700 rounded opacity-100 p-1"
                type="text"
                placeholder="Search For Location"
                value={""}
                onChange={(e) => e.target.value}
                onClick={() => setShowForm(true)}
              />
            </form>
          )}
        </header>
      )}

      {onLandingPage && (
        <div className="relative top-1/3 text-center">
          <Link className="block hover:bg-sky-700 rounded-md" to="/current">
            <h2 className="text-xl py-2">Current Weather</h2>
          </Link>
          <Link className="block hover:bg-sky-700 rounded-md" to="/map">
            <h2 className="text-xl py-2">Weather Map</h2>
          </Link>
          <Link className="block hover:bg-sky-700 rounded-md" to="/">
            <h2 className="text-xl py-2">Forecast (Coming Soon)</h2>
          </Link>
        </div>
      )}

      <div id="detail">
        <Outlet />
      </div>
      {!onLandingPage && <Navbar />}
    </div>
  );
}
