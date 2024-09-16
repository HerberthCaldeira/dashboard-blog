import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useGetCategory from "@/actions/category/useGetCategory";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/pages/components/tanStackTable/paginate/Index";
import { handlePageQueryString } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

export default function Index() {
  console.log("table render");
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: handlePageQueryString(searchParams.get("page")),
    pageSize: 15,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [vSearch, setVsearch] = useState("");

  const dbfs = useCallback(
    useDebounce((e) => {
      setGlobalFilter(e);
    }, 500),
    [],
  );

  const handlerSearch = (e) => {
    setVsearch(e);
    dbfs(e);
  };

  const {
    data: apiResponse,
    isError,
    error,
  } = useGetCategory({ page: pagination.pageIndex, search: globalFilter });

  useEffect(() => {
    setData(apiResponse?.data);
  }, [apiResponse]);

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: ({ cell, row }) => {
          return (
            <div>
              <strong>{row.original.id}</strong>
            </div>
          );
        },
      },
      {
        header: "Name",
        accessorKey: "name",
      },
    ],
    [],
  );

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      pagination,
      globalFilter,
    },

    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,

    manualPagination: true,
    autoResetPageIndex: false,

    pageCount: apiResponse?.meta?.last_page + 1,
    rowCount: apiResponse?.meta?.total, // total rows
    onPaginationChange: (updater) => {
      // make sure updater is callable (to avoid typescript warning)
      if (typeof updater !== "function") return;
      const newPageInfo = updater(table.getState().pagination);
      // console.log("old pagination :: ", table.getState().pagination);
      // console.log("new pagination :: ", newPageInfo, newPageInfo?.pageIndex);
      searchParams.set("page", newPageInfo?.pageIndex);
      setSearchParams(searchParams);
      setPagination(newPageInfo);
    },

    debugTable: true,
  });

  return (
    <>
      pagination:{JSON.stringify(pagination)}
      <div>
        <input
          value={vSearch}
          onChange={(e) => handlerSearch(String(e.target.value))}
          placeholder="Search..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.id === "title" ? (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ) : (
                    <div>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </>
  );
}
