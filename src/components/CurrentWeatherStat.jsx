// My Components
import Thermometer from "./Thermometer.jsx";

// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let graph;
  if (stat.name === "Temperature" || stat.name === "Feels like") {
    graph = <Thermometer temp={stat.value} />;
  }

  let content;
  if (stat.name === "Wind direction") {
    content = (
      <p>
        {stat.name}: <TiLocationArrow className={stat.styles} />
        {stat.value}
      </p>
    );
  } else {
    content = (
      <>
        <p className="px-4 text-center">
          {stat.name}: {stat.value}
          {stat.units}
        </p>
      </>
    );
  }

  return (
    <figure className="weather-stat text-sm flex flex-col justify-center items-center bg-[rgba(23,37,84,0.4)] rounded-xl m-1">
      {content}
      {graph}
    </figure>
  );
}
