export default function CustomMarker({ data, icon }) {
  return (
    <div className="custom-marker-container">
      <div className="custom-marker"></div>
      {data ? (
        <div className="custom-marker-text flex flex-col items-center">
          <div className="scale-75">{icon}</div>
          <span className="relative bottom-1">{data.name}</span>
          <span className="relative bottom-1">
            {data.main.temp.toFixed(1)}°C
          </span>
          <span className="relative bottom-1">
            {data.weather[0].description}
          </span>
        </div>
      ) : (
        "Loading data..."
      )}
    </div>
  );
}
