import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/requests";

interface IParams {
  page: number;
  search: string | null;
  externalFilters: object;
}

const useGetCategory = ({ page, search, externalFilters }: IParams) => {
  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: categoryKeys.paginate(page, search, externalFilters),
    queryFn: async () =>
      await getRequest("/api/category", {
        params: {
          page,
          search,
          externalFilters,
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
