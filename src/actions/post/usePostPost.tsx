import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";

const postRequest = async (data) => {
  try {
    const response = await axios.post("/api/post/store", data);
    return response.data;
  } catch (err) {
    console.log("catch::", err);
    throw err; // need to throw or onError will fail
  }
};

export default function usePostPost() {
  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (data) => postRequest(data),
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey:  });
    },
    onError: (error) => {
      //console.log("onError::", error?.response?.data?.errors);
    },
  });

  return {
    mutate,
    error,
    isError,
    isPending,
  };
}
