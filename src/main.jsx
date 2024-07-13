// React DOM
import ReactDOM from "react-dom/client";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React-Redux's Context Provider
import { Provider } from "react-redux";

// Redux Store
import { store } from "./store/index.js";

// Root Element / Page
import Root from "./Root.jsx";

// My Pages
import CurrentPage from "./pages/CurrentPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import ForecastPage from "./pages/ForecastPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Styles
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

// // Tomorrow.io / ClimaCell API test
// const options = { method: "GET" };
// fetch(
//   "https://api.tomorrow.io/v4/weather/realtime?location=Pwllheli&units=metric&apikey=uHRwNBfZ4wdj8PmZ8ueU25NHB1eggBo9",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/current",
        element: <CurrentPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/forecast",
        element: <ForecastPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
