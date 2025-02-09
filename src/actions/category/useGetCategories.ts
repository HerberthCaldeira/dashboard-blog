import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/http";
import type { ICategoryFormFilters } from "@/pages/authenticated/category/types";

interface IUseGetCategories {
  formFilters: ICategoryFormFilters;
  page: string;
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
    queryKey: categoryKeys.paginate({ formFilters, page, sorting }),
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
