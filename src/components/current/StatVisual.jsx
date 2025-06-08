// Local Components
import Thermometer from "./visuals/Thermometer.jsx";
import { PieChart } from "./visuals/PieChart";
import { WindArrows } from "./visuals/WindArrows";
import { WindDirection } from "./visuals/WindDirection";
import { VisibilityScale } from "./visuals/VisibilityScale";

const VISUALIZATION_MAP = {
  Temperature: (stat) => <Thermometer temp={stat.value} />,
  "Feels like": (stat) => <Thermometer temp={stat.value} />,
  "Cloud cover": (stat) => (
    <PieChart
      value={stat.value}
      foregroundColor="DimGray"
      backgroundColor="SkyBlue"
    />
  ),
  Humidity: (stat) => (
    <PieChart
      value={stat.value}
      foregroundColor="DarkBlue"
      backgroundColor="transparent"
    />
  ),
  "Wind speed": (stat) => <WindArrows intensityIdx={stat.intensityIdx} />,
  "Wind gust": (stat) => <WindArrows intensityIdx={stat.intensityIdx} />,
  "Wind direction": (stat) => <WindDirection styles={stat.styles} />,
  Visibility: (stat) => <VisibilityScale value={stat.value} />,
};

export default function StatVisualization({ stat }) {
  const VisualizationComponent = VISUALIZATION_MAP[stat.name];
  return VisualizationComponent ? VisualizationComponent(stat) : null;
}
