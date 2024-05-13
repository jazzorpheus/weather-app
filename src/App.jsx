// My Components
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Map />
      <LocationSearch />
      <Navbar />
    </div>
  );
}
