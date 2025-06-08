// Local Components
import Thermometer from "./visuals/Thermometer";
import PieChart from "./visuals/PieChart";
import WindArrows from "./visuals/WindArrows";
import WindDirection from "./visuals/WindDirection";
import VisibilityScale from "./visuals/VisibilityScale";

const VISUALS_MAP = {
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

export default function StatVisual({ stat }) {
  const VisualComponent = VISUALS_MAP[stat.name];
  return VisualComponent ? VisualComponent(stat) : null;
}
