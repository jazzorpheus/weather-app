import { createAsyncThunk } from "@reduxjs/toolkit";

import { useGetSuggestions } from "../../hooks/use-get-suggestions";

const fetchCoords = createAsyncThunk("/fetchCoords", async (searchTerm) => {
  const response = await useGetSuggestions(searchTerm);

  if (response[0] && response[0].geometry && response[0].geometry.coordinates) {
    return response[0].geometry.coordinates;
  } else {
    console.error("Invalid search term, defaulting to Manchester, UK.");
    alert("Invalid search term, defaulting to Manchester, UK.");
    return [-2.245115, 53.479489];
  }
});

export { fetchCoords };
