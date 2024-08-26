import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";

const postRequest = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post("/api/category/store", data);
    return response.data;
  } catch (err) {
    //console.log("catch err ", err);
    throw err;
  }
};

export default function usePostCategory() {
  //const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data) => postRequest(data),
    onSuccess: () => {
      console.log("onSuccess");
      // Invalidate and refetch
      //queryClient.invalidateQueries({ queryKey:  });
    },
    onError: (err) => {
      //console.log("onError::", err);
    },
  });

  return {
    mutate,
    isPending,
    error,
    isError,
  };
}
