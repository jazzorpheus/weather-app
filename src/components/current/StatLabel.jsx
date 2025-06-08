// Icons
import { TiLocationArrow } from "react-icons/ti";

export default function StatLabel({ stat }) {
  if (stat.name === "Wind direction") {
    return (
      <p className="relative top-[20%] text-center">
        {stat.name}: <TiLocationArrow className={stat.styles} />
        {stat.value}
      </p>
    );
  }
  return (
    <p className="relative top-[15%] text-center">
      {stat.name}: {stat.value}
      {stat.units}
    </p>
  );
}
