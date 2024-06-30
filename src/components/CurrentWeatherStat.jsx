// My Components
import Thermometer from "./Thermometer.jsx";
import ThermometerChart from "./ThermometerChart.jsx";

// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let graph;
  if (stat.name === "Temperature" || stat.name === "Feels like") {
    graph = <Thermometer temp={stat.value} />;
    // graph = <ThermometerChart temp={stat.value} />;
  } else {
    graph = <p>&lt;*Graph goes here!*&gt;</p>;
  }

  let content;
  if (stat.name === "Wind direction") {
    content = (
      <p className="relative top-[20%] text-center">
        {stat.name}: <TiLocationArrow className={stat.styles} />
        {stat.value}
      </p>
    );
  } else {
    content = (
      <>
        <p className="relative top-[20%] text-center">
          {stat.name}: {stat.value}
          {stat.units}
        </p>
      </>
    );
  }

  return (
    <figure className="weather-stat text-sm flex flex-col justify-center items-center bg-[rgba(23,37,84,0.4)] rounded-xl m-1">
      {graph}
      {content}
    </figure>
  );
}
