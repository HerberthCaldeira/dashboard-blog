import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  UseMutationOptions,
  QueryClient,
} from "@tanstack/react-query";
import { z } from "zod";

interface ApiResponse<R> {
  status: number;
  data: R;
}

interface ApiError {
  message: string;
}

interface UseFormWithQueryProps<T extends FieldValues, R> extends Omit<UseFormProps<T>, "resolver"> {
  schema: z.ZodType<T>;
  transformFn?: <TFormData>(data: TFormData) => any;
  mutationFn: (data: any) => Promise<ApiResponse<R>>;
  mutationOptions?: Omit<UseMutationOptions<ApiResponse<R>, ApiError, T>, "mutationFn">;
  queryKeysToInvalidate?: any[][];
}

/**
 * React hook form
 * Zod
 * React query (mutate)
 */
const useMyForm = <T extends FieldValues, R>({
  schema,
  transformFn,
  mutationFn,
  mutationOptions,
  queryKeysToInvalidate,
  ...formProps
}: UseFormWithQueryProps<T, R>) => {
  const queryClient = new QueryClient();

  const formMethods = useForm<T>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (queryKeysToInvalidate) {
        queryKeysToInvalidate.forEach((key: Array<any>) => {
          console.log("key", key);
          queryClient.invalidateQueries(key);
        });
      }
      //formMethods.reset();
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      console.log("useMyForm::error", error);

      if (error?.response.status !== 422) throw error;

      const serverErrors = error?.response.data.errors;

      for (const key in serverErrors) {
        formMethods.setError(key, {
          type: "serverError",
          message: serverErrors[key][0],
        });
      }
    },
  });

  const onSubmit = formMethods.handleSubmit(async (data) => {
    const transformedData = transformFn ? transformFn(data) : data;
    console.log("transformedData", transformedData);
    await mutation.mutateAsync(transformedData);
  });

  const {
    formState: { errors },
  } = formMethods;

  return {
    formMethods,
    isSubmitting: mutation.isPending,
    submitError: mutation.error,
    onSubmit,
    errors,
  };
};

export default useMyForm;
