// Icons
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

// Reusable scroll button
export default function HorizontalScrollButton({ direction, scrollX }) {
  // Determine position based on direction provided
  const buttonStyles = `fixed top-1/2 -translate-y-1/2 z-10 p-2 ${
    direction === "right" ? "right-0" : "left-0"
  }`;

  return (
    <button onClick={scrollX} className={buttonStyles}>
      {direction === "right" ? (
        <FaCircleArrowRight className="scale-150" />
      ) : (
        <FaCircleArrowLeft className="scale-150" />
      )}
    </button>
  );
}
