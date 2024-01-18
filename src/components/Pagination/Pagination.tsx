import React, { useState } from "react";

type Props = {
  itemsPerPage: number;
  data: any[];
  setCurrentItems: (currentItems: any[]) => void;
};

export const PaginatedList:React.FC<Props> = ({ itemsPerPage, data, setCurrentItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

 const handlePageChange = (pageNumber: number) => {
   setCurrentPage((prevPage) => {
     const newCurrentPage = pageNumber;
     const newIndexOfFirstItem = (newCurrentPage - 1) * itemsPerPage;
     const newIndexOfLastItem = newIndexOfFirstItem + itemsPerPage;
     const newCurrentItems = data.slice(
       newIndexOfFirstItem,
       newIndexOfLastItem
     );

     setCurrentItems(newCurrentItems);
     return newCurrentPage;
   });
 };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

