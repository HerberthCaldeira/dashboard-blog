import { deleteRequest } from "@/lib/axios/http";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategory = () => {
  const { mutate } = useMutation({
    mutationFn: (id) => deleteRequest(`/api/category/${id}/delete`),
  });

  return {
    mutate,
  };
};

export default useDeleteCategory;
