export default function CurrentWeatherStat({ stat }) {
  return (
    <figure className="weather-stat text-lg flex justify-between items-center border-b border-white pb-2 mt-2">
      {stat.name}: {stat.value}
      &nbsp;
      {stat.units}
    </figure>
  );
}
