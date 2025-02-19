import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/http";
import actions from "..";

interface IUseGetPosts {
  page: number;
  pageSize: number;
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
  pageSize,
  sorting,
}: IUseGetPosts) {
  const { data, error, isError, isPending } = useQuery({
    queryKey: actions.post.querykeys.paginate({
      formFilters,
      page,
      pageSize,
      sorting,
    }),
    queryFn: async () =>
      await getRequest("/api/post", {
        params: {
          formFilters,
          page,
          pageSize,
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
