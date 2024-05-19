// React DOM
import ReactDOM from "react-dom/client";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React-Redux's Context Provider
import { Provider } from "react-redux";

// Redux Store
import { store } from "./store/index.js";

// My Components
// import App from "./App.jsx";
import Root from "./Root.jsx";
import Map from "./components/Map.jsx";

// My Pages
import CurrentPage from "./pages/CurrentPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Styles
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

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
        element: <Map />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
