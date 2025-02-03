import { useNavigate, useParams } from "react-router-dom";
import actions from "@/actions";
import useMyForm from "@/components/my/form/react-hook-form";
import { zodSchema } from "../schemas/zodSchema";
import Form from ".";
import { useEffect } from "react";

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

  console.log(category);

  const { formMethods, onSubmit, errors, isSubmitting } = useMyForm({
    schema: zodSchema,
    mutationFn: actions.category.update,
    transformFn: (data) => {
      console.log("transformFn", data);
      return {
        id: data.id,
        payload: { name: data.name },
      };
    },
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
      defaultValues: { id: null, name: "" },
    },
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
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
