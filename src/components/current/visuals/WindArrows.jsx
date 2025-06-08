export function WindArrows({ intensityIdx }) {
  const arrowBaseStyles = {
    position: "relative",
    width: "100px",
    height: "2px",
    backgroundColor: "white",
  };

  const arrowHeads = Array.from({ length: intensityIdx }, (_, i) => (
    <div
      style={{
        content: "",
        position: "absolute",
        top: "-4px",
        right: `${i * 10 - 4}px`,
        width: "0",
        height: "0",
        borderLeft: "10px solid white",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
      }}
      key={i}
    />
  ));

  return (
    <div style={arrowBaseStyles}>
      <div>{arrowHeads}</div>
    </div>
  );
}
