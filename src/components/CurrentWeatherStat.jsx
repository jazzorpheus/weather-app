// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function CurrentWeatherStat({ stat }) {
  let content;
  if (stat.name === "Wind direction") {
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
    <figure className="weather-stat text-sm flex justify-center items-center border rounded-2xl m-1">
      {content}
    </figure>
  );
}
