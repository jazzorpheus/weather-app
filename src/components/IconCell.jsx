import useGetIcon from "../hooks/use-get-icon";

export default function IconCell({ dataPoint }) {
  const icon = useGetIcon(dataPoint.weather[0]);
  return <td className="px-4 py-3 border-none">{icon}</td>;
}
