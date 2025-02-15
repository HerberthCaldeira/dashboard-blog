import { categoryKeys } from "../../../../actions/category/queryKeys";
import useMyForm from "@/components/my/form/react-hook-form";
import actions from "@/actions";
import Form from ".";
import { useNavigate } from "react-router-dom";
import { categorySchema, TCategoryFormFields } from "../schemas/zodSchema";

export default function Create() {
  const navigate = useNavigate();
  const { formMethods, onSubmit, errors, isSubmitting } = useMyForm({
    schema: categorySchema,
    mutationFn: actions.category.create,
    queryKeysToInvalidate: [actions.category.querykeys.all],
    mutationOptions: {
      onSuccess: (data, variables, context) => {
        console.log("data", data);
        console.log("variables", variables);
        console.log("context", context);
        //formMethods.reset(); working fine
        navigate("/dashboard/category");
      },
    },
    defaultValues: { id: null, name: "" },
  });

  return (
    <>
      <div>[go back to list] | NewCatagory</div>

      <Form
        formMethods={formMethods}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
