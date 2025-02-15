import useMyForm from "@/components/my/form/react-hook-form";
import { postSchema } from "../schemas/zodSchema";
import Form from ".";
import actions from "@/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditPost() {
  const params = useParams();

  const { data: categories, isSuccess: isSuccessCategories } =
    actions.category.useGetCategoryForSelectField();

  const { data: post, isSuccess: isSuccessGetPostById } =
    actions.post.useGetPostById({
      id: params.id,
    });

  const { formMethods, onSubmit, isSubmitting } = useMyForm({
    schema: postSchema,
    mutationFn: actions.post.update,
    transformFn: (data) => {
      if (data.category_id) {
        data.category_id = Number(data.category_id.value);
      }

      return {
        id: post?.data?.id,
        payload: data,
      };
    },
  });

  useEffect(() => {
    if (isSuccessGetPostById) {
      formMethods.reset({
        id: post?.data.id,
        title: post?.data?.title,
        content: post?.data?.content,
        category_id: {
          value: String(post?.data?.category?.id),
          label: post?.data?.category?.name,
        },
        is_published: post?.data?.is_published,
      });
    }
  }, [isSuccessGetPostById]);

  return (
    <div>
      <div>Edit Post</div>
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
