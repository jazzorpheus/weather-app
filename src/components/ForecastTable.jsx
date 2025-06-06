// React Hooks
import { useMemo } from "react";

// Local Components
import ForecastRow from "./ForecastRow";

export default function ForecastTable({ forecastRowsData }) {
  // Memoize forecast row configuration
  const forecastRows = useMemo(() => {
    if (!forecastRowsData) return [];

    return [
      { title: "Temperature", data: forecastRowsData.temperature },
      { title: "Feels like temperature", data: forecastRowsData.feelsLike },
      { title: "Cloud cover", data: forecastRowsData.cloudCover },
      { title: "Humidity", data: forecastRowsData.humidity },
      { title: "Wind speed", data: forecastRowsData.windSpeed },
      { title: "Wind gust", data: forecastRowsData.windGust },
      { title: "Wind direction", data: forecastRowsData.windDirection },
      { title: "Visibility", data: forecastRowsData.visibility },
    ];
  }, [forecastRowsData]);

  return (
    <div>
      <table className="rounded">
        <tbody>
          <tr className="text-center sticky top-0 z-10">
            {forecastRowsData.timestamps}
          </tr>
          <tr className="text-center">{forecastRowsData.icons}</tr>
          {forecastRows.map((row, index) => (
            <ForecastRow
              key={`forecast-row-${index}`}
              rowTitle={row.title}
              rowData={row.data}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
