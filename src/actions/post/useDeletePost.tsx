import { deleteRequest } from "@/lib/axios/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import actions from "..";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id: number) => deleteRequest(`/api/post/${id}/delete`),
    onSuccess: (data, variables, context) => {
      console.log("useMutate::onSuccess");
      queryClient.invalidateQueries({
        queryKey: actions.post.querykeys.all,
      });
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log("useMutate::onError");
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      console.log("useMutate::onSettled");
    },
  });

  return {
    mutate,
    isSuccess,
    isPending,
  };
}
