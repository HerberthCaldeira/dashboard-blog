import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/requests";

interface IParams {
  page: number;
  search: string;
}

const useGetCategory = ({ page, search }: IParams) => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: categoryKeys.paginate(page, search),
    queryFn: async () =>
      await getRequest("/api/category", {
        params: {
          page,
          search,
        },
      }),
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
};

export default useGetCategory;
