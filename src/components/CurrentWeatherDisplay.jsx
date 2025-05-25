// Props Validation
import PropTypes from "prop-types";

// React-Redux
import { useSelector } from "react-redux";

// My Components
import CurrentWeatherStat from "./CurrentWeatherStat";

// Custom Hooks
import useGetIcon from "../hooks/use-get-icon";

export default function CurrentWeatherDisplay({ data }) {
  // State from store
  const currentWeather = useSelector((state) => state.currentWeather);

  // Get icon matching description
  const weatherIcon = useGetIcon(currentWeather.data);
  console.log(currentWeather.data);

  const header = (
    <>
      <h1 className="text-3xl font-bold mb-1">{data.location.value}</h1>
      {weatherIcon}
      <h2 className="text-2xl mb-2">{data.description.value}</h2>
    </>
  );

  const currentStats = Object.values(data)
    .slice(2)
    .map((stat) => <CurrentWeatherStat key={stat.name} stat={stat} />);

  return (
    <div className="flex flex-col items-center h-full w-full mt-[56px] mb-[10px]">
      {header}
      <div className="flex-grow grid grid-rows-4 grid-cols-2 w-full max-w-[700px]">
        {currentStats}
      </div>
    </div>
  );
}

// Props Validation
CurrentWeatherDisplay.propTypes = {
  data: PropTypes.shape({
    location: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
