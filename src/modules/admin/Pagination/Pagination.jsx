// Pagination
  import "./Pagination.css";
  const Pagination = ({
    totalPages,
    rowsPerPage,
    currentPage,
    setCurrentPage,
    indexOfLastModule,
    indexOfFirstModule,
    currentModules,
    filteredModules
}) => {
        //Page change
        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            }
        };
    {/* Pagination */}
    return (
    <div className="pagination">
        <span className="text-muted">
        Showing {filteredModules.length === 0 ? 0 : indexOfFirstModule + 1}
        {" - "}
        {Math.min(indexOfLastModule, filteredModules.length)}
        {" of "}
        {filteredModules.length}
        {" entries"}
        </span>

        <div className="page-buttons">
        {/* Prev */}

        <button
            className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
        >
            Prev
        </button>

        {/* Page Numbers */}

        {Array.from({ length: totalPages }, (_, index) => (
            <button
            key={index}
            className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => goToPage(index + 1)}
            >
            {index + 1}
            </button>
        ))}

        {/* Next */}

        <button
            className={`page-btn ${
            currentPage === totalPages || totalPages === 0 ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => goToPage(currentPage + 1)}
        >
            Next
        </button>
        </div>
    </div> );

}

export default Pagination;