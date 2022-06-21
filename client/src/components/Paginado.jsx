export default function Paginado({ bookPerPage, books1, paginado, page }) {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(books1 / bookPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <div className="nav">
      {pageNum &&
        pageNum.map((num) => (
          <div key={num}>
            <button
              className={num === page ? "btnSel" : "btnNav"}
              onClick={() => paginado(num)}
            >
              {num}
            </button>
          </div>
        ))}
    </div>
  );
}
