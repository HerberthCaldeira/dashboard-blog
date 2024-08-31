import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios/axios";
import { TCategoryFormFields } from "../../pages/authenticated/category/new/zodSchema";

const postRequest = async (data: TCategoryFormFields) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post("/api/category/store", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default function usePostCategory() {
  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: (data: TCategoryFormFields) => postRequest(data),
  });

  return {
    mutate,
    isPending,
    error,
    isError,
    isSuccess,
  };
}
