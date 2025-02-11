import { deleteRequest } from "@/lib/axios/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteRequest(`/api/category/${id}/delete`),
    onSuccess: (data, variables, context) => {
      // I will fire first
      console.log("useMutate::onSuccess");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
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
  };
};

export default useDeleteCategory;
