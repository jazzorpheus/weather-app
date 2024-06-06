// GEOCODER: IMPORT & SET UP GEOCODING FROM MAPBOX-SDK
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocoder = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiamF6em9ycGhldXMiLCJhIjoiY2xid25sbDhnMHlzZTN1bXNiejBvOXl0eiJ9.yv9LtnmzsC6A7a74Fwod7Q",
});

const getSuggestions = async (searchTerm) => {
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
    return response.body.features;
  } else {
    console.error("Could not get search suggestions");
    return 0;
  }
};

export { getSuggestions };
