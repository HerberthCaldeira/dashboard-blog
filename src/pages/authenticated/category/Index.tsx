import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useGetCategory from "@/actions/category/useGetCategory";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/pages/components/tanStackTable/paginate/Index";
import useTableManagement from "@/pages/components/tanStackTable/hooks/useTableManagement";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import MyInput from "@/pages/components/form/fields/MyInput";
import { Button } from "@/components/ui/button";
import MyCalendar from "@/pages/components/form/fields/MyCalendar";
import useSetQueryStringManagement from "@/pages/components/tanStackTable/hooks/useSetQueryStringManagement";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [formFilters, setExternalFilters] = useState({
    title: searchParams.get("formFilters[title]") ?? "",
    createdAt: searchParams.get("formFilters[createdAt]") ?? "",
  });

  const {
    defaultData,
    searchBar,
    setSearchBar,
    sorting,
    setSorting,
    visualSearchForInput,
    handlerSearch,
    pagination,
    setPagination,
  } = useTableManagement();

  const {
    data: apiResponse,
    isError,
    error,
    isSuccess,
  } = useGetCategory({
    page: pagination.pageIndex,
    searchBar,
    formFilters,
    sorting,
  });

  useSetQueryStringManagement({
    isSuccess,
    searchBar,
    sorting,
    page: pagination,
    formFilters,
  });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const columns = useMemo(
    () => [
      {
        id: "select-col",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            // indeterminate={table.getIsSomeRowsSelected()} // TODO: create component to handler interminate. see tansatack doc
            onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
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

  const table = useReactTable({
    data: apiResponse?.data ?? defaultData,
    getRowId: (row) => row.id,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      pagination,
      globalFilter: searchBar,
      sorting,
    },
    onSortingChange: setSorting,

    manualSorting: true,

    manualFiltering: true,
    onGlobalFilterChange: setSearchBar,

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

  //filter form
  const formFilterMethods = useForm({
    defaultValues: {
      title: searchParams.get("formFilters[title]") ?? "",
      createdAt: searchParams.get("formFilters[createdAt]") ?? "",
    },
  });

  const handlerformgetsubmit = (data) => {
    setExternalFilters(data);
    console.log("final data for filter in server", data);
  };
  /*
  console.log('a',table.getState().rowSelection) //get the row selection state - { 1: true, 2: false, etc... }
  console.log('b',table.getSelectedRowModel().rows) //get full client-side selected rows
  console.log('c',table.getFilteredSelectedRowModel().rows) //get filtered client-side selected rows
  console.log('d',table.getGroupedSelectedRowModel().rows) //get grouped client-side selected rows
 */
  return (
    <>
      pagination:{JSON.stringify(pagination)}
      formFilters:{JSON.stringify(formFilters)}
      <div className="border-2 border-indigo-400">
        <FormProvider {...formFilterMethods}>
          <form onSubmit={formFilterMethods.handleSubmit(handlerformgetsubmit)}>
            <MyCalendar form={formFilterMethods} name="createdAt" />
            <MyInput type="text" name={"title"} label={"title"} />
            <Button type="submit">submit</Button>
          </form>
        </FormProvider>
      </div>
      <div>
        <Input
          value={visualSearchForInput}
          onChange={(e) => handlerSearch(e)}
          placeholder="Search..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {
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
                  }
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
