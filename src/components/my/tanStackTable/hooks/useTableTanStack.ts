import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import tableUrlParamsManagament from "../helpers/tableUrlParamsManagament";

interface ITanstackTable {
  columns: any;
  apiResponse: any;
}

/**
 * @returns
 */
const useTableTanStack = ({ columns, apiResponse }: ITanstackTable) => {
  const defaultData = useMemo(() => [], []);
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    pageIndex: tableUrlParamsManagament.handlePageQueryString(
      searchParams.get("page")
    ),
    pageSize: 15,
  });

  const [sorting, setSorting] = useState<
    {
      id: string;
      desc: boolean;
    }[]
  >(() => {
    const sortingParam = searchParams.get("sorting");
    return sortingParam
      ? tableUrlParamsManagament.extractSortingArrayFromQueryString(sortingParam)
      : [{ id: "id", desc: false }];
  });

  useEffect(() => {
    if (sorting?.length > 0) {
      setSearchParams((state) => {
        state.set(
          "sorting",
          tableUrlParamsManagament.makeQueryStringFromSortingArray(sorting)
        );
        return state;
      });
    }
  }, [sorting, setSearchParams]);

  const table = useReactTable({
    data: apiResponse?.data ?? defaultData,
    columns,
    getRowId: (row) => row.id, // helps with select row
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting,
      // globalFilter: searchBar,
    },
    onSortingChange: setSorting,

    manualSorting: true,
    manualFiltering: true,
    autoResetPageIndex: false,

    //onGlobalFilterChange: setSearchBar,

    manualPagination: true,
    pageCount: apiResponse?.meta?.last_page + 1,
    rowCount: apiResponse?.meta?.total, // total rows
    onPaginationChange: (updater) => {
      // make sure updater is callable (to avoid typescript warning)
      if (typeof updater !== "function") return;

      const newPageInfo = updater(table.getState().pagination);
      //console.log("old pagination :: ", table.getState().pagination);
      //console.log("new pagination :: ", newPageInfo, newPageInfo?.pageIndex);
      setSearchParams((state) => {
        state.set("page", newPageInfo?.pageIndex);

        return state;
      });
      setPagination(newPageInfo);
    },

    debugTable: true,
  });

  return {
    table,
  };
};

export default useTableTanStack;
