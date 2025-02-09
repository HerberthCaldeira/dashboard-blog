import { EditButton } from "@/components/my/buttons/EditButton";
import TanStackTable from "@/components/my/tanStackTable";
import useTableTanStack from "@/components/my/tanStackTable/hooks/useTableTanStack";
import Pagination from "@/components/my/tanStackTable/paginate/Index";
import { useMemo } from "react";

export default function CategoryTable({ apiResponse }) {
  // //DELETE
  // const queryClient = useQueryClient();
  // const { mutate: deleteMutate } = actions.category.useDeleteCategory();

  // const handlerDelete = (id) => {
  //   deleteMutate(id, {
  //     onSuccess: () => {
  //       console.log("deleted::onSucess");

  //       queryClient.invalidateQueries({
  //         queryKey: categoryKeys.all,
  //       });
  //     },
  //   });
  // };

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
      {
        header: "Actions",
        cell: ({ cell, row }) => {
          return (
            <div>
              {" "}
              <EditButton to={`/dashboard/category/${row.original.id}/edit`} />
              {/* <DeleteModal
                id={row.original.id}
                description={row.original.name}
                handlerDelete={handlerDelete}
              /> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const { table } = useTableTanStack({
    columns,
    apiResponse,
  });

  return (
    <div>
      CategoryTable
      <div>
        <TanStackTable table={table} />
        <Pagination table={table} />
      </div>
    </div>
  );
}
