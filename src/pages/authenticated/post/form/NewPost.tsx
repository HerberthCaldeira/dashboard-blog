import useMyForm from "@/components/my/form/react-hook-form";
import { postSchema } from "../schemas/zodSchema";
import Form from ".";
import actions from "@/actions";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const navigate = useNavigate();

  const { formMethods, onSubmit, isSubmitting } = useMyForm({
    schema: postSchema,
    mutationFn: actions.post.create,
    transformFn: (data) => {
      if (data?.category_id) {
        data.category_id = Number(data.category_id.value);
      }
      return data;
    },
    queryKeysToInvalidate: [actions.post.querykeys.all],
    mutationOptions: {
      onSuccess: (data, variables, context) => {
        console.log("data", data);
        console.log("variables", variables);
        console.log("context", context);
        //formMethods.reset(); working fine
        navigate("/dashboard/posts");
      },
    },
    defaultValues: { id: null, title: "", content: "", category_id: undefined },
  });

  const { data: categories, isSuccess: isSuccessCategories } =
    actions.category.useGetCategoryForSelectField();

  return (
    <div>
      <div>Create Post</div>
      {isSuccessCategories && (
        <Form
          formMethods={formMethods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          categories={categories || { data: [] }}
        />
      )}
    </div>
  );
}
