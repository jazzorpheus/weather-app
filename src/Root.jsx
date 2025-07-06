// React
import { useState, useEffect } from "react";

// React Router
import { useLocation, Link, Outlet } from "react-router-dom";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Async Thunks
import { fetchCurrentWeather } from "./store";

// Local Components
import Navbar from "./components/Navbar.jsx";
import SearchModal from "./components/SearchModal";

// Custom Hooks
import useGeoLocation from "./hooks/use-geo-location.js";

// Assets & Styles
import landingCurrent from "./images/landing-current.png";
import landingMap from "./images/landing-map.png";
import landingForecast from "./images/landing-forecast.png";

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

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleShowSearchModal = () => {
    setShowSearchModal(!showSearchModal);
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
        setShowSearchModal(false);
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
    <div className="flex flex-col items-center h-screen w-screen">
      {!onLandingPage && (
        <header className="fixed w-full z-10">
          {showSearchModal ? (
            <SearchModal
              showModal={showSearchModal}
              toggleShow={toggleShowSearchModal}
              toggleSubmitted={toggleFormSubmitted}
            />
          ) : (
            <form className="flex flex-col items-center my-3">
              <input
                className="text-black border border-gray-700 rounded opacity-100 p-1"
                type="text"
                placeholder="Search For Location"
                onFocus={() => setShowSearchModal(true)}
              />
            </form>
          )}
        </header>
      )}

      {onLandingPage && (
        <div className="flex flex-col justify-center items-center text-center h-screen w-screen bg-gradient-to-t from-zinc-900 to-blue-900 gap-6">
          <Link
            to="/current"
            className="relative flex flex-col items-center w-[80vw] max-w-[600px] rounded-md overflow-hidden group"
          >
            <img
              src={landingCurrent}
              alt="Current Weather"
              className="w-full h-auto object-cover blur-[1px] brightness-75 transition-transform duration-1000 ease-in-out group-hover:scale-105 group-hover:brightness-100"
            />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white drop-shadow-lg">
              Current Weather
            </h2>
          </Link>

          <Link
            to="/map"
            className="relative flex flex-col items-center w-[80vw] max-w-[600px] rounded-md overflow-hidden group"
          >
            <img
              src={landingMap}
              alt="Weather Map"
              className="w-full h-auto object-cover blur-[1px] brightness-75 transition-transform duration-1000 ease-in-out group-hover:scale-105 group-hover:brightness-100"
            />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white drop-shadow-lg">
              Weather Map
            </h2>
          </Link>

          <Link
            to="/forecast"
            className="relative flex flex-col items-center w-[80vw] max-w-[600px] rounded-md overflow-hidden group"
          >
            <img
              src={landingForecast}
              alt="Weather Forecast"
              className="w-full h-auto object-cover blur-[1px] brightness-75 transition-transform duration-1000 ease-in-out group-hover:scale-105 group-hover:brightness-100"
            />
            <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white drop-shadow-lg">
              Weather Forecast
            </h2>
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
