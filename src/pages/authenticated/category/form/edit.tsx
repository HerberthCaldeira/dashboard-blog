import { useNavigate, useParams } from "react-router-dom";
import actions from "@/actions";
import useMyForm from "@/components/my/form/react-hook-form";
import { categorySchema } from "../schemas/zodSchema";
import Form from ".";
import { useEffect } from "react";
import { categoryKeys } from "@/actions/category/queryKeys";

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    isPending,
    isSuccess,
  } = actions.category.useGetCategoryById({
    id: params.id,
  });

  const { formMethods, onSubmit, isSubmitting } = useMyForm({
    schema: categorySchema,
    transformFn: (data) => {
      console.log("transformFn", data);
      return {
        id: data.id,
        payload: { name: data.name },
      };
    },
    mutationFn: actions.category.update,
    mutationOptions: {
      onSuccess: (data, variables, context) => {
        console.log("data", data);
        console.log("variables", variables);
        console.log("context", context);
        navigate("/dashboard/category");
      },
      onError: (error) => {
        console.log("error", error);
      },
    },
    defaultValues: { id: null, name: "" },
    queryKeysToInvalidate: [categoryKeys.useGetCategoryById(params.id!)],
  });

  useEffect(() => {
    if (isSuccess) {
      formMethods.reset({
        id: category?.data.id,
        name: category?.data?.name,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div>[go back to list] | EditCatagory</div>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Form
          formMethods={formMethods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
