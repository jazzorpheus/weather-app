// React Router
import { Outlet } from "react-router-dom";

// My Components
import Navbar from "./components/Navbar.jsx";

export default function Root() {
  return (
    <div className="flex flex-col items-center">
      <header className="absolute z-10 bg-black">
        <h1>Root Element</h1>
        <h2>Search inputs to go here!</h2>
      </header>

      <div id="detail">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
