import './Filterbar.scss';

export default function Filterbar({
  queryParams,
  deleteQuery,
  deleteAllQueries,
}) {
  const filterValues = Array.from(queryParams.values());
  const filterKeys = Array.from(queryParams.keys());
  const removeBtn = '/images/icon-remove.svg';

  return (
    <div className="filter">
      <div className="filter-container">
        {filterValues.map((filterValue, idx) => {
          const filterKey = filterKeys[idx];
          if (filterKey === 'pageNumber') {
            return null;
          }
          return (
            <div className="filter-item" key={filterValue}>
              <span className="filter-name">{filterValue}</span>
              <button className="remove-btn">
                <img
                  src={removeBtn}
                  alt="remove"
                  onClick={() => deleteQuery(idx)}
                />
              </button>
            </div>
          );
        })}
      </div>
      <button className="clear-btn" onClick={deleteAllQueries}>
        Clear
      </button>
    </div>
  );
}
