import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCurrentWeather = createAsyncThunk(
  "/fetchCurrentWeather",
  async (coords) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&appid=ff325cbc53fd8a64b302d2866b804fc8`
    );

    return response.data;
  }
);

export { fetchCurrentWeather };
