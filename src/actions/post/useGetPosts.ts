import { useQuery } from "@tanstack/react-query";
import { postQKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/http";
import actions from "..";

interface IUseGetPosts {
  page: number;
  sorting: {
    id: string;
    desc: boolean;
  }[];
}

export default function useGetPosts({ page, sorting }: IUseGetPosts) {
  const { data, error, isError, isPending } = useQuery({
    queryKey: actions.post.querykeys.paginate({ page, sorting }),
    queryFn: async () =>
      await getRequest("/api/post", {
        params: {
          page,
          sorting,
        },
      }),
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
}
