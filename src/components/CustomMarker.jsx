export default function CustomMarker({ data }) {
  console.log("Custom marker data:", data);
  return (
    <>
      <h1>Custom Marker!!</h1>
      {data?.weather[0].description && <h2>{data.weather[0].description}</h2>}
    </>
  );
}
