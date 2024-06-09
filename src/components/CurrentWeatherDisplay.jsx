// My Components
import CurrentWeatherStat from "./CurrentWeatherStat";

// Custom Hooks
import useGetIcon from "../hooks/use-get-icon";

export default function CurrentWeatherDisplay({ data }) {
  const weatherIcon = useGetIcon();
  const headers = data.slice(0, 2);
  const header = (
    <>
      <h2 className="text-3xl font-bold my-3">{headers[0].value}</h2>{" "}
      {weatherIcon}
      <h3 className="text-2xl mt-2">{headers[1].value}</h3>
    </>
  );

  const statList = data.slice(2);
  const weatherStats = statList.map((stat) => (
    <CurrentWeatherStat key={stat.name} stat={stat} />
  ));

  return (
    <div className="flex flex-col items-center mb-5">
      {header}
      {weatherStats}
    </div>
  );
}
