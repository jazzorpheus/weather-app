// React
import { useState, useRef, useEffect } from "react";

// ReactDOM
import { createPortal } from "react-dom";

// React-Redux
import { useDispatch } from "react-redux";

// Async Thunks
import { fetchCoords } from "../store/thunks/fetchCoords";

function SearchModal({ toggle, showForm }) {
  // Local state for form
  const [searchTerm, setSearchTerm] = useState("");

  // Dispatch function
  const dispatch = useDispatch();

  // Make sure user can't scroll while modal is shown on-screen
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    // CleanUp function
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Hijack control of form input value and render search suggestions
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length > 1) {
      const response = await getSearchSuggestions(searchTerm);
      console.log(response, typeof response);
      setSuggestions(response);
    }
  };

  const formRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    // Focus on the input field when the form is rendered
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);
  let suggestionsContent;
  if (suggestions[0]) {
    suggestionsContent = (
      <div className="bg-gray-900 rounded-md p-3">
        {suggestions.map((sugg) => {
          return (
            <>
              <li
                className="flex justify-between items-center list-none m-2"
                key={sugg.id}
              >
                <p className="mr-5">{sugg.place_name}</p>

                <button
                  onClick={() => {
                    setSearchTerm(sugg.place_name);
                  }}
                >
                  Go
                </button>
              </li>
              <hr />
            </>
          );
        })}
      </div>
    );
  } else {
    suggestionsContent = "";
  }

  // Handle form submission: Fetch coords using search term
  // (Triggers fetchWeatherData once coords change)
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(fetchCoords(searchTerm));
    setSearchTerm("");
    toggle();
    // Remove focus from input element
    document.querySelector('input[name="searchTerm"]').blur();
  };

  return createPortal(
    <div className="fixed inset-0 top-1/3 bg-gray-300 opacity-80">
      <form
        className="flex flex-col items-center mt-3"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input
          className="text-black border-2 border-gray-700 rounded pt-1 ps-1"
          name="searchTerm"
          type="text"
          placeholder="Enter location name"
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button className="bg-gray-900 mt-3 mb-3" type="submit">
          Get Weather
        </button>
        {suggestionsContent}
      </form>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default SearchModal;

// GEOCODER: IMPORT & SET UP GEOCODING FROM MAPBOX-SDK
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocoder = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xid25sbDhnMHlzZTN1bXNiejBvOXl0eiJ9.yv9LtnmzsC6A7a74Fwod7Q",
});

const getSearchSuggestions = async (searchTerm) => {
  console.log("IN GET SEARCH SUGGESTIONS");

  const response = await geocoder
    .forwardGeocode({
      query: searchTerm,
      limit: 5,
    })
    .send();

  if (
    response &&
    response.body &&
    response.body.features &&
    response.body.features.length > 0
  ) {
    console.log("getSearchSuggestions response data:", response.body.features);
    return response.body.features;
  } else {
    console.error("Couldn't get search suggestions.");
  }
};
