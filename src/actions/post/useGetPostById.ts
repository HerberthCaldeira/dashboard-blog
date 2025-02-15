import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../lib/axios/http";
import actions from "..";

interface IProps {
  id: string | undefined;
}
export default function useGetPostById({ id }: IProps) {
  const { data, error, isError, isPending, isSuccess } = useQuery({
    queryKey: actions.post.keys.useGetPostId(id),
    queryFn: async () => await getRequest(`/api/post/${id}/edit`),
  });

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess,
  };
}
