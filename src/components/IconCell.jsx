import useGetIcon from "../hooks/use-get-icon";

export default function IconCell({ dataPoint }) {
  const icon = useGetIcon(dataPoint);
  return (
    <td className="px-5 py-3 border-none weather-stat bg-[rgba(23,37,84,0.4)]">
      {icon}
    </td>
  );
}
