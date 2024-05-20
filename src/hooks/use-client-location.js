// React Hooks
import { useEffect } from "react";

// React-Redux
import { useDispatch } from "react-redux";

// Action Creator Functions
import { updateCoords } from "../store";

function useClientLocation() {
  // Dispatch function
  const dispatch = useDispatch();

  // *********************************************************************
  // ********************* CENTERED ON USER LOCATION *********************
  // *********************************************************************
  // Initialize map together with its event listeners
  useEffect(() => {
    // Below runs if browser supports geolocation and has allowed its use.
    // If not, handleGetPositionError runs, rendering map centered on default location.
    navigator.geolocation.getCurrentPosition((position) => {
      // Declare map center based on geolocation
      const center = [position.coords.longitude, position.coords.latitude];

      // Update coords in store/state
      dispatch(updateCoords(center));
    }, handleGetPositionError);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // *********************************************************************
  // ******************* CENTERED ON DEFAULT LOCATION ********************
  // *********************************************************************
  // If can't get geolocation or user denied permission, default map center to Manchester, UK.
  function handleGetPositionError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert(
      "Either geolocation is not supported by this browser or permission has been denied. Defaulted to Manchester, UK."
    );
    // Declare default map center
    const center = [-2.245115, 53.479489];
    // Update coords in store/state
    dispatch(updateCoords(center));
  }
}

export default useClientLocation;

// // React Hooks
// import { useEffect, useRef } from "react";

// // React-Redux Hooks
// import { useDispatch } from "react-redux";

// // Custom Hooks
// import useCreateMap from "./use-create-map";

// // Action Creator Functions
// import { updateCoords } from "../store";

// function useClientLocation() {
//   // Reference to map container element
//   const mapContainerRef = useRef();

//   // Dispatch function
//   const dispatch = useDispatch();

//   // *********************************************************************
//   // ********************* CENTERED ON USER LOCATION *********************
//   // *********************************************************************
//   // Initialize map together with its event listeners
//   useEffect(() => {
//     // Below runs if browser supports geolocation and has allowed its use.
//     // If not, handleGetPositionError runs, rendering map centered on default location.
//     navigator.geolocation.getCurrentPosition((position) => {
//       // Declare map center based on geolocation
//       const center = [position.coords.longitude, position.coords.latitude];

//       // Update coords in store/state
//       dispatch(updateCoords(center));

//       // Create map and update relevant state in store [see "use-create-map.js"]
//       const map = useCreateMap(mapContainerRef, center, dispatch);

//       console.log("Displaying map based on client geolocation.");

//       // Clean up on unmount
//       return () => map.remove();
//     }, handleGetPositionError);
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // *********************************************************************
//   // ******************* CENTERED ON DEFAULT LOCATION ********************
//   // *********************************************************************
//   // If can't get geolocation or user denied permission, default map center to Manchester, UK.
//   function handleGetPositionError(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//     alert(
//       "Either geolocation is not supported by this browser or permission has been blocked. Defaulted to Manchester, UK."
//     );
//     // Declare default map center
//     const center = [-2.245115, 53.479489];
//     // Update coords in store/state
//     dispatch(updateCoords(center));

//     // Create map and update relevant state in store [see "use-create-map.js"]
//     const map = useCreateMap(mapContainerRef, center, dispatch);

//     console.log("Using default location: Manchester, UK.");

//     // Clean up on unmount
//     return () => map.remove();
//   }

//   // Pass ref to component where map is rendered
//   return mapContainerRef;
// }

// export default useClientLocation;
