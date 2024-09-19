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

export default function Index() {
  console.log("table render");
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams);

  const [externalFilters, setExternalFilters] = useState({});

  const {
    defaultData,
    globalFilter,
    setGlobalFilter,
    visualSearchForInput,
    handlerSearch,
    pagination,
    setPagination,
  } = useTableManagement();

  const {
    data: apiResponse,
    isError,
    error,
  } = useGetCategory({
    page: pagination.pageIndex,
    search: globalFilter,
    externalFilters,
  });

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

  const table = useReactTable({
    data: apiResponse?.data ?? defaultData,
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

  //filter form
  const formFilterMethods = useForm({
    defaultValues: {
      title: searchParams.get("externalFilters[title]") ?? "",
      createdAt: searchParams.get("externalFilters[createdAt]") ?? "",
    },
  });

  const handlerformgetsubmit = (data) => {
    for (let key in data) {
      if (data[key] == "") {
        searchParams.delete(`externalFilters[${key}]`);
        setSearchParams(searchParams);
      }

      if (key == "createdAt" && data[key] != "") {
        data[key] = new Date(data[key]).toISOString();
      }

      if (data[key] != "") {
        searchParams.set(`externalFilters[${key}]`, data[key]);
        setSearchParams(searchParams);
      }
    }
    setExternalFilters(data);
    console.log("final data for filter in server", data);
  };

  return (
    <>
      pagination:{JSON.stringify(pagination)}
      externalFilters:{JSON.stringify(externalFilters)}
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
