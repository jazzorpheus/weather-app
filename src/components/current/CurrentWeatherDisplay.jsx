// Local Components
import CurrentWeatherStat from "./CurrentWeatherStat";

export default function CurrentWeatherDisplay({
  coords,
  currentData,
  currentIcon,
}) {
  const locationName = currentData.location.value;
  const header = (
    <>
      <h1 className="text-3xl font-bold mb-1">
        {locationName
          ? locationName
          : `Lat ${coords[1].toFixed(2)} | Lon ${coords[0].toFixed(2)}`}
      </h1>
      {currentIcon}
      <h2 className="text-2xl mb-2">{currentData.description.value}</h2>
    </>
  );

  const currentStats = Object.values(currentData)
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
