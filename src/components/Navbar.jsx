// Icons
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiMap } from "react-icons/ci";
import { MdOutlineSatelliteAlt } from "react-icons/md";

export default function Navbar() {

  return (
    <footer className="fixed bottom-0 w-screen bg-gradient-to-t from-blue-950 to-blue-500">
      <nav className="grid grid-cols-3">
          <button className="flex flex-col justify-between items-center text-xs m-2"><TiWeatherPartlySunny className="text-2xl" /> Current</button>
          <button className="flex flex-col justify-between items-center text-xs m-2"><CiMap className="text-2xl" />Map</button>
          <button className="flex flex-col justify-between items-center text-xs m-2" ><MdOutlineSatelliteAlt className="text-2xl" /> Forecast</button>
      </nav>
    </footer>
  )
}