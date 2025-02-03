import { categoryKeys } from "../../../../actions/category/queryKeys";
import { zodSchema } from "../schemas/zodSchema";
import useMyForm from "@/components/my/form/react-hook-form";
import actions from "@/actions";
import Form from ".";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { formMethods, onSubmit, errors, isSubmitting, submitError } =
    useMyForm({
      schema: zodSchema,
      mutationFn: actions.category.create,
      queryKeysToInvalidate: [categoryKeys.all],
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

  console.log(submitError);
  console.log(errors);

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
