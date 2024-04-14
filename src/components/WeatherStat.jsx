function WeatherStat({ stat }) {
  return (
    <div>
      <figure className="weather-stat text-lg flex justify-between items-center border-b border-white pb-2 mt-2">
        {stat.name}: {stat.value}
        {stat.units}
      </figure>
    </div>
  );
}

export default WeatherStat;
