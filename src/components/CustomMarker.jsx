export default function CustomMarker({ data, icon }) {
  return (
    <div className="custom-marker-container">
      <div className="custom-marker-pointer"></div> {/* Pointer first! */}
      {data ? (
        <div className="custom-marker-text flex flex-col items-center gap-1">
          <span>{icon}</span>
          <span>{data.main.temp.toFixed(1)}°C</span>
          <span className="bg-white text-black w-[100%] rounded-md">
            {data.name}
          </span>
          <span>{data.weather[0].description}</span>
        </div>
      ) : (
        "Loading data..."
      )}
    </div>
  );
}
