export default function Index({ table }) {
  // console.log("pagination render");
  return (
    <div className="flex justify-between">
      <button
        onClick={() => table.setPageIndex(1)}
        disabled={table.getState().pagination.pageIndex === 1}
      >
        {"<<a"}
      </button>
      <button
        onClick={() =>
          table.setPageIndex(table.getState().pagination.pageIndex - 1)
        }
        disabled={table.getState().pagination.pageIndex === 1}
      >
        {"<"}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {"a>>"}
      </button>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 15, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
