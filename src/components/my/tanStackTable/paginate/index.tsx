import { useSearchParams } from "react-router-dom";

export default function Pagination({ table }) {
  const [searchParams, setSearchParams] = useSearchParams();
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
          console.log("change pagesize");
          table.setPagination({
            pageSize: Number(e.target.value),
            pageIndex: 1,
          });

          setSearchParams((state) => {
            state.set("page", 1);
            state.set("page_size", e.target.value);
            return state;
          });
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
