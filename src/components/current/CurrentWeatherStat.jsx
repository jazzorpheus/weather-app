// Local Components
import StatVisual from "./StatVisual";
import StatLabel from "./StatLabel";

export default function CurrentWeatherStat({ stat }) {
  return (
    <figure className="weather-stat text-sm flex flex-col justify-center items-center bg-[rgba(23,37,84,0.4)] rounded-xl m-1">
      <StatVisual stat={stat} />
      <StatLabel stat={stat} />
    </figure>
  );
}
