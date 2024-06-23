// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let content;
  if (stat.name === "Wind direction") {
    console.log("IN WEATHER STAT:", stat);
    content = (
      <>
        <p>
          {stat.name}: <TiLocationArrow className={stat.styles} />
          {stat.value}
        </p>
      </>
    );
  } else {
    content = (
      <>
        <p>
          {stat.name}: {stat.value}
          {stat.units}
        </p>
      </>
    );
  }

  return (
    <figure className="weather-stat text-lg flex justify-between items-center border-b border-white pb-2 mt-2">
      {content}
    </figure>
  );
}
