// Local Components
import Dropdown from "./Dropdown";

// Configuration
import { STYLE_OPTIONS, LAYER_OPTIONS } from "../config/mapConfig";

// Extract controls component from map for better organization
export default function MapControls({
  selectedStyle,
  selectedLayer,
  onStyleChange,
  onLayerChange,
}) {
  return (
    <div className="absolute bottom-20 left-0 w-full px-2 flex flex-wrap justify-start gap-2">
      <Dropdown
        className="w-[130px] min-w-0 flex-shrink"
        label="Map Style"
        options={STYLE_OPTIONS}
        value={selectedStyle}
        onChange={onStyleChange}
      />
      <Dropdown
        className="w-[150px] min-w-0 flex-shrink"
        label="Add Layer"
        options={LAYER_OPTIONS}
        value={selectedLayer}
        onChange={onLayerChange}
      />
    </div>
  );
}
