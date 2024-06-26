// React
import { useState, useEffect } from "react";

// React Router
import { useLocation, Link, Outlet } from "react-router-dom";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Async Thunks
import { fetchCurrentWeather } from "./store";

// My Components
import Navbar from "./components/Navbar.jsx";
import SearchModal from "./components/SearchModal";

// Custom Hooks
import useGeoLocation from "./hooks/use-geo-location.js";

export default function Root() {
  // ************************************************************************** CUSTOM MARKER

  // Get client geolocation and dispatch to store
  useGeoLocation();

  // Get current URL path to check for /map [see below]
  const currentPath = useLocation();

  // Dispatch function
  const dispatch = useDispatch();

  // From coordsSlice
  const coords = useSelector((state) => state.coords.coords);

  // From mapSlice
  const mapObj = useSelector((state) => state.map.mapObj);

  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const toggleFormSubmitted = () => {
    setFormSubmitted(!formSubmitted);
  };

  //  - Get new current weather data
  //  - Re-center map if change comes from form search
  //  - Move map marker to new coords
  const getNewLocationData = () => {
    if (coords[0] || coords[1]) {
      dispatch(fetchCurrentWeather(coords));
      if (formSubmitted) {
        // If map displaying, fly to location when form submitted
        if (currentPath.pathname === "/map") {
          mapObj.flyTo({
            center: coords,
            zoom: 9,
            essential: true,
          });
        }
        toggleFormSubmitted();
        setShowForm(false);
      }
    }
  };

  // When coords change
  useEffect(() => {
    getNewLocationData();
  }, [coords]);

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
                className="text-black border border-gray-700 rounded opacity-100 p-1"
                type="text"
                placeholder="Search For Location"
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
          <Link className="block hover:bg-sky-700 rounded-md" to="/forecast">
            <h2 className="text-xl py-2">Weather Forecast</h2>
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
