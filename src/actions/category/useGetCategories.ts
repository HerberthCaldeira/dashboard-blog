import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/http";
import type { ICategoryFormFilters } from "@/pages/authenticated/category/types";
import actions from "..";

interface IUseGetCategories {
  formFilters: ICategoryFormFilters;
  page: number;
  sorting: {
    id: string;
    desc: boolean;
  }[];
}

const useGetCategories = ({
  formFilters,
  page,
  sorting,
}: IUseGetCategories) => {
  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: actions.category.querykeys.paginate({
      formFilters,
      page,
      sorting,
    }),
    queryFn: async () =>
      await getRequest("/api/category", {
        params: {
          formFilters,
          page,
          sorting,
        },
      }),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
  };
};

export default useGetCategories;
