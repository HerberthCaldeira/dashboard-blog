import { useQuery } from "@tanstack/react-query";
import { postQKeys } from "./queryKeys";
import { getRequest } from "../../lib/axios/http";

export default function useGetPost() {
  const { data, error, isError, isPending } = useQuery({
    queryKey: postQKeys.all,
    queryFn: async () => await getRequest("/api/post"),
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
}
