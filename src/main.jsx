// React
import React from "react";
import ReactDOM from "react-dom/client";

// React-Redux's Context Provider
import { Provider } from "react-redux";

// Redux Store
import { store } from "./store/index.js";

// App Component
import App from "./App.jsx";

// Styles
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
