// React-Redux Hooks
import { useSelector } from "react-redux";

// My Components
import CurrentWeatherStat from "./CurrentWeatherStat";

// Custom Hooks
import useGetIcon from "../hooks/use-get-icon";

export default function CurrentWeatherDisplay({ data }) {
  // State from store
  const currentWeather = useSelector((state) => state.currentWeather.data);

  // Get icon matching description
  const weatherIcon = useGetIcon(currentWeather.weather[0]);

  // Header contains: location, icon, description
  const headers = data.slice(0, 2);
  const header = (
    <>
      <h1 className="text-3xl font-bold mb-1">{headers[0].value}</h1>
      {weatherIcon}
      <h2 className="text-2xl mb-2">
        {headers[1].value.charAt(0).toUpperCase() + headers[1].value.slice(1)}
      </h2>
    </>
  );

  // Map rest of stats
  const statList = data.slice(2);
  const weatherStats = statList.map((stat) => (
    <CurrentWeatherStat key={stat.name} stat={stat} />
  ));

  return (
    <div className="flex flex-col items-center h-full w-full mt-[56px] mb-[10px]">
      {header}
      <div className="flex-grow grid grid-rows-4 grid-cols-2 w-full max-w-[700px]">
        {weatherStats}
      </div>
    </div>
  );
}
