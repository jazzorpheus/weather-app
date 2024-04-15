import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchWeatherData = createAsyncThunk(
  "/fetchWeatherData",
  async (coords) => {
    console.log("IN FETCH WEATHER DATA");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=ff325cbc53fd8a64b302d2866b804fc8`
    );

    console.log("fetchWeatherData response data:", response.data);

    return response.data;
  }
);

export { fetchWeatherData };
