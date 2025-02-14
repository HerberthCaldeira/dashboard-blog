import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";

interface UseFormWithQueryProps<T extends FieldValues, R>
  extends Omit<UseFormProps<T>, "resolver"> {
  schema: z.ZodType<T>;
  mutationFn: (data: any) => Promise<AxiosResponse>;
  transformFn?: <TFormData>(data: TFormData) => any;
  mutationOptions?: Omit<
  UseMutationOptions<AxiosResponse, AxiosError, T>,
  "mutationFn"
  >;
  queryKeysToInvalidate?: any[][];
}

/**
 * @param schema zod schema with rules to validate the form before submit
 * @param transformFn function to transform the form data before submit
 * @param mutationFn function to execute the mutation
 * @param mutationOptions options for the mutation executate extra action in the side effects (onSuccess, onError...)
 * @param queryKeysToInvalidate query keys to invalidate on onSuccess side effect
 */
const useMyForm = <T extends FieldValues, R>({
  schema,
  transformFn,
  mutationFn,
  mutationOptions,
  queryKeysToInvalidate,
  ...formProps
}: UseFormWithQueryProps<T, R>) => {
  const queryClient = useQueryClient();

  /**
   * Make Form
   */
  const formMethods = useForm<T>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  /**
   * Make submit mutation
   */
  const mutation = useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (queryKeysToInvalidate) {
        queryKeysToInvalidate.forEach((key: Array<any>) => {
          console.log("queryKeysToInvalidate::key", key);
          queryClient.invalidateQueries(key);
        });
      }
      //formMethods.reset();
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error: AxiosError<T>) => {
      console.log("useMyForm::error", error);

      if (error?.response?.status !== 422) throw error;

      const serverErrors = error?.response?.data?.errors;

      for (const key in serverErrors) {
        formMethods.setError(key, {
          type: "serverError",
          message: serverErrors[key][0],
        });
      }
    },
  });

  /**
   * Combine form and mutation
   */
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
