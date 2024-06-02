import { createAsyncThunk } from "@reduxjs/toolkit";

import { useGetSuggestions } from "../../hooks/use-get-suggestions";

const fetchCoords = createAsyncThunk("/fetchCoords", async (searchTerm) => {
  // Define regular expression to match non-English characters
  const allowedChars = /[^a-zA-Z0-9\s,.'-]/g;

  // Replace non-English characters with empty string
  const filteredTerm = searchTerm.replace(allowedChars, "");

  // Get suggestions based on filtered search term
  const response = await useGetSuggestions(filteredTerm);

  // Use only the first suggestion which should match the filtered term accurately
  if (response[0] && response[0].geometry && response[0].geometry.coordinates) {
    return response[0].geometry.coordinates;
  } else {
    console.error("Invalid search term, defaulting to Manchester, UK.");
    alert("Invalid search term, defaulting to Manchester, UK.");
    return [-2.245115, 53.479489];
  }
});

export { fetchCoords };
