import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import usePostCategory from "../../../../actions/category/usePostCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCategoryFormFields, zodSchema } from "./zodSchema";
import MyInput from "../../../components/form/fields/MyInput";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "../../../../actions/category/queryKeys";
import { Button } from "@/components/ui/button";

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
        if (err instanceof AxiosError && err?.response?.status === 422) {
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
      <div>[go back to list] | NewCatagory</div>

      <div className="container mx-auto">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
              name={"name"}
              label={"nome"}
              type={"text"}
              errors={errors}
            />

            <div className="flex mt-2">
              <Button variant="outline" type="submit">
                {" "}
                SUBMIT{" "}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
