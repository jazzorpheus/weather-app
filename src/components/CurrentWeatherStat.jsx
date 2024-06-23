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
        <p className="px-5">
          {stat.name}: {stat.value}
          {stat.units}
        </p>
      </>
    );
  }

  return (
    <figure className="weather-stat text-sm flex justify-center items-center border rounded-2xl bg-[rgba(0,0,0,0.4)] m-1">
      {content}
    </figure>
  );
}
