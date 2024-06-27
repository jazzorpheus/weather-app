// Icons
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiMap } from "react-icons/ci";
import { MdOutlineSatelliteAlt } from "react-icons/md";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <footer className="navbar fixed bottom-0 w-screen bg-gradient-to-t from-blue-800 to-sky-300">
      <nav className="grid grid-cols-3">
        <Link
          className="flex flex-col justify-between items-center text-xs m-2"
          to="/current"
        >
          <TiWeatherPartlySunny className="text-2xl" /> Current
        </Link>
        <Link
          className="flex flex-col justify-between items-center text-xs m-2"
          to="/map"
        >
          <CiMap className="text-2xl" />
          Map
        </Link>
        <Link
          className="flex flex-col justify-between items-center text-xs m-2"
          to="/forecast"
        >
          <MdOutlineSatelliteAlt className="text-2xl" /> Forecast
        </Link>
      </nav>
    </footer>
  );
}
