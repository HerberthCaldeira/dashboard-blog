import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import usePostCategory from "../../../../actions/category/usePostCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCategoryFormFields, zodSchema } from "./zodSchema";
import Input from "../../../components/Form/Fields/Input";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "../../../../actions/category/queryKeys";

export default function NewCatagory() {
  const queryClient = useQueryClient();

  const methods = useForm<TCategoryFormFields>({
    defaultValues: { name: "" },
    resolver: zodResolver(zodSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const { mutate } = usePostCategory();

  const onSubmit: SubmitHandler<TCategoryFormFields> = (data) => {
    console.log("onSubmit", data);
    mutate(data, {
      onSuccess: () => {
        console.log("onSuccess");
        reset();
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err?.response.status === 422) {
          const serverErrors = err?.response.data.errors;

          for (const key in serverErrors) {
            setError(key, {
              type: "serverError",
              message: serverErrors[key][0],
            });
          }
        }
      },
    });
  };

  return (
    <>
      <div>NewCatagory</div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name={"name"} label={"nome"} type={"text"} errors={errors} />

            <button type="submit"> SUBMIT </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
