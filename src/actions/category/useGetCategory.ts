import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/http";
import { ITableStateForFilter } from "@/shared/types/table-states";

const useGetCategory = ({
  page,
  searchBar,
  formFilters,
  sorting,
}: ITableStateForFilter) => {
  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: categoryKeys.paginate(page, searchBar, sorting, formFilters),
    queryFn: async () =>
      await getRequest("/api/category", {
        params: {
          page,
          search: searchBar,
          sorting,
          formFilters,
        },
      }),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
  };
};

export default useGetCategory;
