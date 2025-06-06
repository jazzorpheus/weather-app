// Icons
import AshIcon from "../../icons/AshIcon";
import CloudsIcon from "../../icons/CloudsIcon";
import DrizzleIcon from "../../icons/DrizzleIcon";
import DustIcon from "../../icons/DustIcon";
import FogIcon from "../../icons/FogIcon";
import HazeIcon from "../../icons/HazeIcon";
import MistIcon from "../../icons/MistIcon";
import RainIcon from "../../icons/RainIcon";
import SandIcon from "../../icons/SandIcon";
import SmokeIcon from "../../icons/SmokeIcon";
import SnowIcon from "../../icons/SnowIcon";
import SquallIcon from "../../icons/SquallIcon";
import SunClouds from "../../icons/SunClouds";
import SunIcon from "../../icons/SunIcon";
import ThunderstormIcon from "../../icons/ThunderstormIcon";
import TornadoIcon from "../../icons/TornadoIcon";

// Get icon SVG matching current weather description
function getWeatherIcon(data) {
  const weatherItem = data?.weather?.[0];

  if (!weatherItem || !weatherItem.main || !weatherItem.description) {
    return null;
  }

  const { main, description } = weatherItem;

  switch (main) {
    case "Ash":
      return <AshIcon className="fill-white" />;
    case "Clear":
      return <SunIcon className="fill-amber-400" />;
    case "Clouds":
      switch (description) {
        case "few clouds":
        case "scattered clouds":
          return <SunClouds className="fill-white" />;
        case "broken clouds":
        case "overcast clouds":
          return <CloudsIcon className="fill-white" />;
        default:
          return <CloudsIcon className="fill-white" />;
      }
    case "Drizzle":
      return <DrizzleIcon className="fill-white" />;
    case "Dust":
      return <DustIcon className="fill-white" />;
    case "Fog":
      return <FogIcon className="fill-white" />;
    case "Haze":
      return <HazeIcon />;
    case "Mist":
      return <MistIcon className="fill-white" />;
    case "Rain":
      return <RainIcon className="fill-white" />;
    case "Sand":
      return <SandIcon className="fill-white" />;
    case "Smoke":
      return <SmokeIcon className="fill-white" />;
    case "Snow":
      return <SnowIcon className="fill-white" />;
    case "Squall":
      return <SquallIcon className="fill-white" />;
    case "Thunderstorm":
      return <ThunderstormIcon className="fill-white" />;
    case "Tornado":
      return <TornadoIcon className="fill-white" />;
    default:
      return null;
  }
}

export default getWeatherIcon;
