import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Paginate.scss';

export default function Paginate({ pages, page, isAdmin = false, addQuery }) {
  const navigate = useNavigate();
  return (
    pages > 1 && (
      <ul className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1} className="pagination-item">
            <button
              className={
                x + 1 === page ? 'pagination-btn active' : 'pagination-btn'
              }
              onClick={
                !isAdmin
                  ? () => addQuery('pageNumber', x + 1)
                  : () => navigate(`/admin/joblist/${x + 1}`)
              }
            >
              {x + 1}
            </button>
          </li>
        ))}
      </ul>
    )
  );
}
