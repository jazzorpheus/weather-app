import CloudsIcon from "../icons/CloudsIcon";

export default function CustomMarker({ data }) {
  return (
    <div className="custom-marker-container">
      <div className="custom-marker"></div>
      {data ? (
        <div className="custom-marker-text flex flex-col items-center">
          <CloudsIcon className="fill-white scale-75 relative top-1" />
          <span className="relative bottom-1">{data.name}</span>
          <span className="relative bottom-1">
            {(data.main.temp - 273.15).toFixed(1)}°C
          </span>
          <span className="relative bottom-1">
            {data.weather[0].description}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
