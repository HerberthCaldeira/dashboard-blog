import { useMutation } from "@tanstack/react-query";
import { TCategoryFormFields } from "../../pages/authenticated/category/schemas/zodSchema";
import { putRequest } from "@/lib/axios/requests";

export default function usePutCategory({ id }: { id: number }) {
  const url = `/api/category/${id}/update`;
  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: (data: TCategoryFormFields) => putRequest(url, data),
  });

  return {
    mutate,
    isPending,
    error,
    isError,
    isSuccess,
  };
}
