import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/http";
import actions from "..";

interface IUseGetPosts {
  page: number;
  sorting: {
    id: string;
    desc: boolean;
  }[];
  formFilters: {
    search: string;
    createdAt: string;
    category_id: string;
  };
}

export default function useGetPosts({
  formFilters,
  page,
  sorting,
}: IUseGetPosts) {
  const { data, error, isError, isPending } = useQuery({
    queryKey: actions.post.querykeys.paginate({ formFilters, page, sorting }),
    queryFn: async () =>
      await getRequest("/api/post", {
        params: {
          formFilters,
          page,
          sorting,
        },
      }),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
}
