import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchWeatherData = createAsyncThunk(
  "/fetchWeatherData",
  async (coords) => {
    console.log("IN FETCH WEATHER DATA");

    const WEATHER_KEY = process.env.WEATHER_KEY;

    const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=${WEATHER_KEY}`;

    const response = await axios.get(Url);

    console.log("fetchWeatherData response data:", response.data);

    return response.data;
  }
);

export { fetchWeatherData };
