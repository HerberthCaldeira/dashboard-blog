import useGetCategoryById from "@/actions/category/useGetCategoryById";
import { Button } from "@/components/ui/button";
import MyInput from "@/pages/components/form/fields/MyInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TCategoryFormFields, zodSchema } from "../schemas/zodSchema";
import usePutCategory from "@/actions/category/usePutCategory";
import { categoryKeys } from "@/actions/category/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function EditFormCategory() {
  const queryClient = useQueryClient();
  const params = useParams();

  const { data } = useGetCategoryById({ id: params.id });

  const formMethods = useForm<TCategoryFormFields>({
    resolver: zodResolver(zodSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data?.data?.name,
      });
    }
  }, [data]);

  const { mutate } = usePutCategory({ id: params.id });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("onSuccess");
        reset();
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: categoryKeys.useGetCategoryById(params.id),
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err?.response?.status === 422) {
          const serverErrors = err?.response?.data.errors;

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
      <div className="container mx-auto">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
              name={"name"}
              label={"Name"}
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
