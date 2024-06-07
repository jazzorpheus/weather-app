// My Components
import WeatherStat from "./WeatherStat";

// Custom Hooks
import useGetIcon from "../hooks/use-get-icon";

export default function WeatherDataDisplay({ data }) {
  const weatherIcon = useGetIcon();
  const headers = data.slice(0, 2);
  const header = (
    <>
      <h2 className="text-3xl font-bold pb-3">{headers[0].value}</h2>{" "}
      {weatherIcon}
      <h3 className="text-2xl mt-2">{headers[1].value}</h3>
    </>
  );

  const statList = data.slice(2);
  const weatherStats = statList.map((stat) => (
    <WeatherStat key={stat.name} stat={stat} />
  ));

  return (
    <div className="flex flex-col items-center mb-5">
      {header}
      {weatherStats}
    </div>
  );
}
