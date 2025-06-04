// Moment.js
import moment from "moment-timezone";

// Local Utilities
import convertWeatherData from "../data-conversions/convertWeatherData";
import tempToColor from "../data-conversions/tempToColor";

// Icons
import { TiLocationArrow } from "react-icons/ti";

// Local Components
import IconCell from "../../components/IconCell";

// Create reducer callback for generating table row data
export default function createReducer(timezone) {
  return (acc, timeslot) => {
    const converted = convertWeatherData(timeslot);

    Object.keys(acc).forEach((key) => {
      const cell = renderCell(key, timeslot, converted, timezone);
      acc[key].push(cell);
    });

    return acc;
  };
}

// Render table data cell by key // type
function renderCell(key, timeslot, converted, timezone) {
  const timeString = moment.unix(timeslot.dt).tz(timezone).format("ddd HH:mm");

  switch (key) {
    case "timestamps":
      return (
        <td className="weather-stat bg-gray-900" key={timeslot.dt}>
          {timeString}
        </td>
      );

    case "icons":
      return <IconCell key={timeslot.dt} dataPoint={timeslot} />;

    case "temperature": {
      const tempColor = tempToColor(converted[key].value, 0.6);
      return (
        <td
          style={{ backgroundColor: tempColor }}
          className="weather-stat py-2"
          key={timeslot.dt}
        >
          {converted[key].value}
          {converted[key].units}
        </td>
      );
    }

    case "feelsLike": {
      const feelsLikeColor = tempToColor(converted[key].value, 0.6);
      return (
        <td
          style={{ backgroundColor: feelsLikeColor }}
          className="weather-stat py-2"
          key={timeslot.dt}
        >
          {converted[key].value}
          {converted[key].units}
        </td>
      );
    }

    case "windDirection":
      return (
        <td className="weather-stat py-2" key={timeslot.dt}>
          <TiLocationArrow className={converted[key].styles} />
          {converted[key].value}
        </td>
      );

    default:
      return (
        <td className="weather-stat py-2" key={timeslot.dt}>
          {converted[key].value}
          {converted[key].units}
        </td>
      );
  }
}
