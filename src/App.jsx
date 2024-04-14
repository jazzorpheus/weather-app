// Custom Hooks
import useGetBackground from "./hooks/use-get-background";

// My Components
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";

export default function App() {
  const styles = useGetBackground();

  return (
    <div className={styles}>
      <Map />
      <LocationSearch />
    </div>
  );
}
