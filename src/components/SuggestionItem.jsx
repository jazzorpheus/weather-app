function SuggestionItem({ children }) {
  return (
    <>
      <li className="flex justify-between items-center list-none m-2">
        <button>{children}</button>
      </li>
      <hr />
    </>
  );
}

export default SuggestionItem;
