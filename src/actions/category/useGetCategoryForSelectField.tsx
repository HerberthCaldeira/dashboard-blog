import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/requests";

const useGetCategoryForSelectField = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: categoryKeys.select,
    queryFn: async () => await getRequest("/api/category/select"),
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
};

export default useGetCategoryForSelectField;
