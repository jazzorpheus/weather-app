export default function PieChart({
  value,
  foregroundColor,
  backgroundColor = "transparent",
}) {
  const pieStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `conic-gradient(${foregroundColor} calc(${value} * 1%), ${backgroundColor} 0)`,
  };
  return <div style={pieStyles}></div>;
}
