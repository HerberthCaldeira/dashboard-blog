import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/http";
import { AxiosError } from "axios";
import { ICategoryOptions } from "@/pages/authenticated/post/schemas/zodSchema";

const useGetCategoryForSelectField = () => {
  const { data, error, isError, isPending, isSuccess } = useQuery<
    ICategoryOptions,
    AxiosError<{ message: string }>
  >({
    queryKey: categoryKeys.select,
    queryFn: async () => await getRequest("/api/category/select"),
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
  };
};

export default useGetCategoryForSelectField;
