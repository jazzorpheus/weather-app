// React Hooks
import { useState } from "react";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Action Creator Functions
import { updateMapStyle } from "../store";

// Custom Hooks
import useInitMap from "../hooks/use-init-map";

// My Components
import Dropdown from "./Dropdown";

function Map() {
  // Dispatch function
  const dispatch = useDispatch();

  // Initialize map
  const mapContainerRef = useInitMap();

  // Get coords from store
  const coords = useSelector((state) => state.coords.coords);

  // **********************************************************  STYLE DROPDOWN CONFIG
  const [selectedStyle, setSelectedStyle] = useState(null);
  // Change map style selection in dropdown, update map style
  const handleSelect = (option) => {
    setSelectedStyle(option);
    switch (option.value) {
      case "dark":
        dispatch(updateMapStyle("mapbox://styles/mapbox/dark-v11"));
        break;
      case "light":
        dispatch(updateMapStyle("mapbox://styles/mapbox/light-v11"));
        break;
      case "outdoors":
        dispatch(updateMapStyle("mapbox://styles/mapbox/outdoors-v12"));
        break;
      case "satellite":
        dispatch(
          updateMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
        );
        break;
      case "streets":
        dispatch(updateMapStyle("mapbox://styles/mapbox/streets-v12"));
        break;
      default:
        dispatch(
          updateMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
        );
        break;
    }
  };
  // List of options
  const options = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "Outdoors", value: "outdoors" },
    { label: "Satellite", value: "satellite" },
    { label: "Streets", value: "streets" },
  ];

  // **********************************************************************  LAYER DROPDOWN

  // **********************************************************************  LAYER DROPDOWN

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-dvw">
        {/* <div className="sidebar text-white bg-gray-700 ">
          Longitude: {coords[0]} | Latitude: {coords[1]}
        </div> */}
        <div
          ref={mapContainerRef}
          className="map-container w-100 border-4 border-gray-900"
        />
        <div className="absolute -translate-y-16 translate-x-28">
          <Dropdown
            options={options}
            value={selectedStyle}
            onChange={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;
