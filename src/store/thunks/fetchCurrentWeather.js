import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCurrentWeather = createAsyncThunk(
  "/fetchCurrentWeather",
  async (coords, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords[1]}&lon=${coords[0]}&appid=ff325cbc53fd8a64b302d2866b804fc8`
      );
      return response.data;
    } catch (err) {
      console.error(
        "Couldn't get current weather data in fetchCurrentWeather thunk (see below)",
        err
      );
      return rejectWithValue(
        "Cannot load weather data right now. Please try again later."
      );
    }
  }
);

export { fetchCurrentWeather };
