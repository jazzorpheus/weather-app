function SuggestionItem({ children, onClick }) {
  return (
    <>
      <li className="flex justify-between items-center list-none m-2">
        <button onClick={onClick}>{children}</button>
      </li>
      <hr />
    </>
  );
}

export default SuggestionItem;
