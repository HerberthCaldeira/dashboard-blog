import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";

const postRequest = async (payload) => {
  const response = await axios.post("/api/category/store", payload);
  return response.data;
};

const usePostCategory = () => {
  //const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data) => postRequest(data),
    onSuccess: () => {
      console.log("onSuccess");
      // Invalidate and refetch
      //queryClient.invalidateQueries({ queryKey:  });
    },
    onError: (error, variables, context) => {
      console.log(error);
      console.log(error.response);
    },
  });

  return {
    mutate,
    isPending,
    error,
    isError,
  };
};

export { usePostCategory };
