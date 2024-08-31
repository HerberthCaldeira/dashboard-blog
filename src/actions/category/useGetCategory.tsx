import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/requests";

const useGetCategory = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: async () => await getRequest("/api/category"),
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
};

export default useGetCategory;
