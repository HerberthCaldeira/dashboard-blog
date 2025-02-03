import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "@/lib/axios/http";

interface IParams {
  id: string | undefined;
}

const useGetCategoryById = ({ id }: IParams) => {
  const url = `/api/category/${id}/edit`;

  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: categoryKeys.useGetCategoryById(id),
    queryFn: async () => await getRequest(url),
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
  };
};

export default useGetCategoryById;
