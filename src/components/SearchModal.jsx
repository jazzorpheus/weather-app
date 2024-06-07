// React
import { useState, useRef, useEffect } from "react";

// ReactDOM
import { createPortal } from "react-dom";

// React-Redux
import { useDispatch } from "react-redux";

// Action Creator Function
import { updateCoords } from "../store";

// Utility Functions
import { getSuggestions } from "../utils/getSuggestions";

// My Components
import SuggestionItem from "./SuggestionItem";

function SearchModal({ showForm, toggleShow, toggleSubmitted }) {
  // Local state for form
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Dispatch function
  const dispatch = useDispatch();

  // Focus on the input field when the form is rendered
  const inputRef = useRef(null);
  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  // Make sure user can't scroll while modal is shown on-screen
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    // CleanUp function
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Hijack control of form input value
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Get suggestions once search term required length
  useEffect(() => {
    const runGetSuggestions = async () => {
      const response = await getSuggestions(searchTerm);
      setSuggestions(response);
    };
    if (searchTerm.length > 1) {
      runGetSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // If there are suggestions, generate list
  let suggestionsContent;
  if (suggestions[0]) {
    suggestionsContent = (
      <div className="bg-gray-900 rounded-md p-3">
        {suggestions.map((sugg) => {
          return (
            <SuggestionItem
              key={sugg.id}
              onClick={(event) => {
                // Update coords which triggers getNewLocationData in Root.jsx
                dispatch(updateCoords(sugg.center));
                handleSubmit(event);
              }}
            >
              {sugg.place_name}
            </SuggestionItem>
          );
        })}
      </div>
    );
  } else {
    suggestionsContent = null;
  }

  // Handle form submission: clear input, toggle formSubmitted state etc.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.length < 1) {
      return;
    }
    setSearchTerm("");
    toggleSubmitted();
    // Remove focus from input element
    document.querySelector('input[name="searchTerm"]').blur();
  };

  const handleCancel = () => {
    toggleShow();
  };

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-start bg-gray-300 opacity-80">
      <div className="flex justify-center w-5/6 mt-5">
        <button
          className="self-start text-white border-2 border-gray-700 bg-gray-900 rounded opacity-100 p-1 px-2 me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <form
          className="flex flex-col w-3/5 max-w-[400px]"
          onSubmit={handleSubmit}
        >
          <input
            className="text-black border-2 border-gray-700 rounded opacity-100 p-1"
            name="searchTerm"
            type="text"
            placeholder="Search For Location"
            value={searchTerm}
            onChange={handleInputChange}
            ref={inputRef}
          />
          {suggestionsContent}
        </form>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default SearchModal;
