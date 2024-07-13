// Utilites
import tempToColor from "../utils/tempToColor";

export default function Thermometer({ temp }) {
  const tempCol = tempToColor(temp);
  let tempPercent = ((Number(temp) + 30) / 80) * 100;
  if (tempPercent < 0) {
    tempPercent = 0;
  } else if (tempPercent > 100) {
    tempPercent = 100;
  }

  return (
    <div className="w-[120px] h-[10px] block rounded-xl border relative">
      <div
        style={{
          width: "1px",
          height: "5px",
          left: "2%",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "10",
        }}
      >
        <span
          style={{
            position: "relative",
            top: "6px",
            left: "-9px",
            fontSize: "0.7rem",
          }}
        >
          -30
        </span>
      </div>
      <div
        style={{
          width: "1px",
          height: "5px",
          left: "97%",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "10",
        }}
      >
        <span
          style={{
            position: "relative",
            top: "6px",
            left: "-5px",
            fontSize: "0.7rem",
          }}
        >
          50
        </span>
      </div>
      <div
        style={{
          width: "1px",
          height: "5px",
          left: "37.5%",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "10",
        }}
      >
        <span
          style={{
            position: "relative",
            top: "6px",
            left: "-3px",
            fontSize: "0.7rem",
          }}
        >
          0
        </span>
      </div>
      <div
        style={{
          backgroundColor: tempCol,
          width: `${tempPercent}%`,
          borderTopRightRadius: tempPercent > 99 ? "12px" : "",
          borderBottomRightRadius: tempPercent > 99 ? "12px" : "",
        }}
        className="bg-red-500 h-full rounded-l-xl opacity-70"
      ></div>
    </div>
  );
}
