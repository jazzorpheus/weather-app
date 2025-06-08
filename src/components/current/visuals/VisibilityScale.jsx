export default function VisibilityScale({ value }) {
  const scaleBaseStyles = {
    position: "relative",
    width: "100px",
    height: "8px",
    borderBottom: "solid white 2px",
    borderLeft: "solid white 2px",
    borderRight: "solid white 2px",
  };

  const indicatorPosition =
    value === 0 ? "-2%" : `${value * 10 - 1 / Math.ceil(value)}%`;

  return (
    <div style={scaleBaseStyles}>
      <span
        style={{
          position: "absolute",
          fontSize: "0.7rem",
          left: "-4px",
          top: "5px",
        }}
      >
        0
      </span>
      <div
        style={{
          position: "absolute",
          content: "",
          width: "2px",
          borderBottom: "solid gold 9px",
          left: indicatorPosition,
          bottom: "0",
        }}
      ></div>
      <span
        style={{
          position: "absolute",
          fontSize: "0.7rem",
          left: "90px",
          top: "5px",
        }}
      >
        10
      </span>
    </div>
  );
}
