import useMyForm from "@/components/my/form/react-hook-form";
import { postSchema } from "../schemas/zodSchema";
import Form from ".";
import actions from "@/actions";

export default function NewPost() {
  const { formMethods, onSubmit, isSubmitting } = useMyForm({
    schema: postSchema,
    mutationFn: actions.post.create,
    transformFn: (data) => {
      if (data?.category_id) {
        data.category_id = Number(data.category_id.value);
      }
      return data;
    },
    queryKeysToInvalidate: [actions.post.keys.all],
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
