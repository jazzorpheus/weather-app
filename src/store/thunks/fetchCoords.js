import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GEOCODER: IMPORT & SET UP GEOCODING FROM MAPBOX-SDK
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const mapBoxToken =
  "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xid25sbDhnMHlzZTN1bXNiejBvOXl0eiJ9.yv9LtnmzsC6A7a74Fwod7Q";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const fetchCoords = createAsyncThunk("/fetchCoords", async (searchTerm) => {
  console.log("IN FETCH COORDS");

  const response = await geocoder
    .forwardGeocode({
      query: searchTerm,
      limit: 1,
    })
    .send();

  if (
    response &&
    response.body &&
    response.body.features &&
    response.body.features.length > 0
  ) {
    console.log(
      "fetchCoords response data:",
      response.body.features[0].geometry.coordinates
    );
    return response.body.features[0].geometry.coordinates;
  } else {
    console.error("Invalid search term, defaulting to Manchester, UK.");
    alert("Invalid search term, defaulting to Manchester, UK.");
    return [-2.245115, 53.479489];
  }
});

export { fetchCoords };
