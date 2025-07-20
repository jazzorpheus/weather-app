// React
import { useState, useRef, useEffect } from "react";

// ReactDOM
import { createPortal } from "react-dom";

// React-Redux
import { useDispatch } from "react-redux";

// Action Creator Function
import { updateCoords } from "../store";

// Local Utilities
import { getSuggestions } from "../utils/getSuggestions";

// Local Components
import SuggestionItem from "./SuggestionItem";

export default function SearchModal({
  showModal,
  toggleShow,
  toggleSubmitted,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Autofocus input
  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  // Disable page scroll
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Fetch suggestions on input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const runGetSuggestions = async () => {
        if (searchTerm.length > 1) {
          const response = await getSuggestions(searchTerm);
          if (response && response !== 0) {
            setSuggestions(response);
          } else {
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
      };
      runGetSuggestions();
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Reset highlight when suggestions update
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Key navigation
  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          const selected = suggestions[highlightedIndex];
          dispatch(updateCoords(selected.center));
          handleSubmit(event);
        }
        break;
      default:
        break;
    }
  };

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.length < 1) return;
    setSearchTerm("");
    toggleSubmitted();
    document.querySelector('input[name="searchTerm"]').blur();
  };

  const handleCancel = () => {
    toggleShow();
  };

  // Suggestions list
  let suggestionsContent = null;
  if (suggestions[0]) {
    suggestionsContent = (
      <div className="bg-gray-900 rounded-md p-3">
        {suggestions.map((sugg, index) => (
          <SuggestionItem
            key={sugg.id}
            highlighted={index === highlightedIndex}
            onClick={(event) => {
              dispatch(updateCoords(sugg.center));
              handleSubmit(event);
            }}
            onMouseEnter={() => setHighlightedIndex(index)} // 👈 new
          >
            {sugg.place_name}
          </SuggestionItem>
        ))}
      </div>
    );
  }

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-start bg-gray-300 opacity-80 z-40">
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
            className="text-black border border-gray-700 rounded opacity-100 p-1"
            name="searchTerm"
            type="text"
            placeholder="Search For Location"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          {suggestionsContent}
        </form>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
