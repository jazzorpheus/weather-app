// My Components
import CurrentWeatherStat from "./CurrentWeatherStat";

// Custom Hooks
import useGetIcon from "../hooks/use-get-icon";

export default function CurrentWeatherDisplay({ data }) {
  const weatherIcon = useGetIcon();
  const headers = data.slice(0, 2);
  const header = (
    <>
      <h1 className="text-3xl font-bold mb-3">{headers[0].value}</h1>{" "}
      {weatherIcon}
      <h2 className="text-2xl mt-2">
        {headers[1].value.charAt(0).toUpperCase() + headers[1].value.slice(1)}
      </h2>
    </>
  );

  const statList = data.slice(2);
  const weatherStats = statList.map((stat) => (
    <CurrentWeatherStat key={stat.name} stat={stat} />
  ));

  return (
    <div className="flex flex-col items-center mt-[56px] mb-[56px]">
      {header}
      {weatherStats}
    </div>
  );
}
