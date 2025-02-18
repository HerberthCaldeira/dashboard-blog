import actions from "@/actions";
import { DeleteButton } from "@/components/my/buttons/DeleteButton";
import { EditButton } from "@/components/my/buttons/EditButton";
import TanStackTable from "@/components/my/tanStackTable";
import useTableTanStack from "@/components/my/tanStackTable/hooks/useTableTanStack";
import Pagination from "@/components/my/tanStackTable/paginate";

import { useMemo } from "react";

export default function PostTable({ posts }) {
  const { mutate: deleteMutate } = actions.post.useDeletePost();

  const handlerDelete = (id: number) => {
    deleteMutate(id, {
      onSuccess: () => {
        console.log("deleted::onSucess");
      },
    });
  };

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
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "CreatedAt",
        accessorKey: "created_at",
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div>
              <EditButton to={`/dashboard/posts/${row.original.id}/edit`} />
              <DeleteButton onDelete={() => handlerDelete(row.original.id)} />
            </div>
          );
        },
      },
    ],
    []
  );

  const { table } = useTableTanStack({
    columns,
    apiResponse: posts,
  });

  return (
    <div>
      <TanStackTable table={table} />
      <Pagination table={table} />
    </div>
  );
}
