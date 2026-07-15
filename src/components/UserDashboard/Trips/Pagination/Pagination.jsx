import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
