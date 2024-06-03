// React-Redux Hooks
import { useSelector } from "react-redux";

// Icons
import AshIcon from "../icons/AshIcon";
import CloudsIcon from "../icons/CloudsIcon";
import DrizzleIcon from "../icons/DrizzleIcon";
import DustIcon from "../icons/DustIcon";
import FogIcon from "../icons/FogIcon";
import HazeIcon from "../icons/HazeIcon";
import MistIcon from "../icons/MistIcon";
import RainIcon from "../icons/RainIcon";
import SandIcon from "../icons/SandIcon";
import SmokeIcon from "../icons/SmokeIcon";
import SnowIcon from "../icons/SnowIcon";
import SquallIcon from "../icons/SquallIcon";
import SunClouds from "../icons/SunClouds";
import SunIcon from "../icons/SunIcon";
import ThunderstormIcon from "../icons/ThunderstormIcon";
import TornadoIcon from "../icons/TornadoIcon";

function useGetIcon() {
  const weatherData = useSelector((state) => state.weatherData);
  let icon;
  if (weatherData.data) {
    const { main } = weatherData.data.weather[0];
    const { description } = weatherData.data.weather[0];
    console.log(description);
    switch (main) {
      case "Ash":
        icon = <AshIcon className="fill-white" />;
        break;
      case "Clear":
        icon = <SunIcon className="fill-amber-400" />;
        break;
      case "Clouds":
        switch (description) {
          case "few clouds":
            icon = <SunClouds className="fill-white" />;
            break;
          case "scattered clouds":
            icon = <SunClouds className="fill-white" />;
            break;
          case "broken clouds":
            icon = <CloudsIcon className="fill-white" />;
            break;
          case "overcast clouds":
            icon = <CloudsIcon className="fill-white" />;
            break;
          default:
            icon = <CloudsIcon className="fill-white" />;
            break;
        }
        break;
      case "Drizzle":
        icon = <DrizzleIcon className="fill-white" />;
        break;
      case "Dust":
        icon = <DustIcon className="fill-white" />;
        break;
      case "Fog":
        icon = <FogIcon className="fill-white" />;
        break;
      case "Haze":
        icon = <HazeIcon />;
        break;
      case "Mist":
        icon = <MistIcon className="fill-white" />;
        break;
      case "Rain":
        icon = <RainIcon className="fill-white" />;
        break;
      case "Sand":
        icon = <SandIcon className="fill-white" />;
        break;
      case "Smoke":
        icon = <SmokeIcon className="fill-white" />;
        break;
      case "Snow":
        icon = <SnowIcon className="fill-white" />;
        break;
      case "Squall":
        icon = <SquallIcon className="fill-white" />;
        break;
      case "Thunderstorm":
        icon = <ThunderstormIcon className="fill-white" />;
        break;
      case "Tornado":
        icon = <TornadoIcon className="fill-white" />;
        break;
      default:
        icon = "";
    }
  } else {
    icon = "";
  }

  return icon;
}

export default useGetIcon;
