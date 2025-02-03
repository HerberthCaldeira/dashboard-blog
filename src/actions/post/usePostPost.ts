import { useMutation } from "@tanstack/react-query";

import { postRequest } from "../../lib/axios/http";

export default function usePostPost() {
  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: async (data) => await postRequest("/api/post/store", data),
  });

  return {
    mutate,
    error,
    isError,
    isPending,
  };
}
