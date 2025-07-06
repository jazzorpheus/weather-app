// React
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { updateMapStyle, updateLayer, updatePrevLayer } from "../store";

// Local Components
import MapControls from "./MapControls";

// Local/Custom Hooks
import useCreateMap from "../hooks/use-create-map";
import useMapEffects from "../hooks/use-map-effects";

// Configuration
import { STYLE_OPTIONS, LAYER_OPTIONS } from "../config/mapConfig";

// Helpers
import { setupLayerAfterStyleChange } from "../utils/map-helpers/layerHelpers";

export default function Map() {
  const dispatch = useDispatch();
  const mapContainerRef = useRef();

  // Redux state
  const currentWeather = useSelector((state) => state.currentWeather);
  const { coords } = useSelector((state) => state.coords);
  const { mapObj, mapStyle, marker, layer, prevLayer } = useSelector(
    (state) => state.map
  );

  // Local state for dropdowns
  const [selectedLayer, setSelectedLayer] = useState(
    LAYER_OPTIONS.find((option) => option.value === layer)
  );
  const [selectedStyle, setSelectedStyle] = useState(
    STYLE_OPTIONS.find((option) => option.value === mapStyle)
  );

  // Initialize map
  useCreateMap(mapContainerRef, mapStyle, coords, dispatch);

  // Handle all map effects (layers, markers)
  useMapEffects(mapObj, currentWeather, coords, layer, prevLayer, marker);

  // Handle layer selection
  const handleLayerSelect = (option) => {
    setSelectedLayer(option);
    dispatch(updatePrevLayer(layer));
    dispatch(updateLayer(option.value));
  };

  // Handle style selection
  const handleStyleSelect = (option) => {
    setSelectedStyle(option);
    dispatch(updateMapStyle(option.value));
    setupLayerAfterStyleChange(layer, mapObj);
  };

  return (
    <div className="fixed inset-0">
      <div ref={mapContainerRef} className="map-container w-full h-full z-0" />
      <MapControls
        selectedStyle={selectedStyle}
        selectedLayer={selectedLayer}
        onStyleChange={handleStyleSelect}
        onLayerChange={handleLayerSelect}
      />
    </div>
  );
}
