// Props Validation
import PropTypes from "prop-types";

export default function ForecastRow({ rowTitle, rowData }) {
  return (
    <>
      <tr>
        <th
          className="arrow-right sticky left-0 bg-gradient-to-r from-zinc-900 to-blue-800 rounded"
          colSpan={2}
        >
          <h2>{rowTitle}</h2>
        </th>
      </tr>
      <tr className="text-center">{rowData}</tr>
    </>
  );
}

ForecastRow.propTypes = {
  rowTitle: PropTypes.string.isRequired,
  rowData: PropTypes.node.isRequired,
};
