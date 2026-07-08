import "./Pagination.css";

const Pagination = () => {
  return (
    <div className="pagination">
      <button>{"<"}</button>

      <button className="active">1</button>

      <button>2</button>

      <button>3</button>

      <button>{">"}</button>
    </div>
  );
};

export default Pagination;
