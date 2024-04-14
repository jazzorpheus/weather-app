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
import SunIcon from "../icons/SunIcon";
import ThunderstormIcon from "../icons/ThunderstormIcon";
import TornadoIcon from "../icons/TornadoIcon";

function useGetIcon() {
  const weatherData = useSelector((state) => state.weatherData);
  let main;
  let icon;
  if (weatherData.data) {
    main = weatherData.data.weather[0].main;
    switch (main) {
      case "Ash":
        icon = <AshIcon styles="fill-white" />;
        break;
      case "Clear":
        icon = <SunIcon />;
        break;
      case "Clouds":
        icon = <CloudsIcon styles="fill-white" />;
        break;
      case "Drizzle":
        icon = <DrizzleIcon styles="fill-white" />;
        break;
      case "Dust":
        icon = <DustIcon styles="fill-white" />;
        break;
      case "Fog":
        icon = <FogIcon styles="fill-white" />;
        break;
      case "Haze":
        icon = <HazeIcon />;
        break;
      case "Mist":
        icon = <MistIcon styles="fill-white" />;
        break;
      case "Rain":
        icon = <RainIcon styles="fill-white" />;
        break;
      case "Sand":
        icon = <SandIcon styles="fill-white" />;
        break;
      case "Smoke":
        icon = <SmokeIcon styles="fill-white" />;
        break;
      case "Snow":
        icon = <SnowIcon styles="fill-white" />;
        break;
      case "Squall":
        icon = <SquallIcon styles="fill-white" />;
        break;
      case "Thunderstorm":
        icon = <ThunderstormIcon styles="fill-white" />;
        break;
      case "Tornado":
        icon = <TornadoIcon styles="fill-white" />;
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
