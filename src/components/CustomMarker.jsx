export default function CustomMarker({ data }) {
  console.log("Custom marker data:", data);
  return (
    <div className="custom-marker-container">
      <div className="custom-marker"></div>
      {data ? (
        <div className="custom-marker-text">
          {(data.main.temp - 273.15).toFixed(1)}°C {data.weather[0].description}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
