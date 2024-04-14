import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchWeatherData = createAsyncThunk(
  "/fetchWeatherData",
  async (coords) => {
    console.log("IN FETCH WEATHER DATA");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=${process.env.WEATHER_KEY}`
    );
    return response.data;

    // // *******************************************************
    // // ******************* IN DEVELOPMENT ********************
    // // *******************************************************
    // if (process.env.NODE_ENV !== "production") {
    //   const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
    //   const response = await axios.get(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}`
    //   );
    //   console.log("fetchWeatherData response data:", response.data);

    //   return response.data;
    //   // *******************************************************
    //   // ******************* IN PRODUCTION ********************
    //   // *******************************************************
    // } else {
    //   const response = await axios.get(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=${process.env.WEATHER_KEY}`
    //   );
    //   return response.data;
    // }
  }
);

export { fetchWeatherData };
