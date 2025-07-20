export default function SuggestionItem({
  children,
  onClick,
  onMouseEnter,
  highlighted,
}) {
  return (
    <>
      <li className="flex justify-between items-center list-none m-2 z-30">
        <button
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          className={`w-full text-left p-2 rounded transition-colors duration-100
            ${highlighted ? "bg-white text-black" : "bg-gray-800 text-gray-200"}
            hover:bg-white hover:text-black`}
        >
          {children}
        </button>
      </li>
      <hr className="border-gray-600" />
    </>
  );
}
