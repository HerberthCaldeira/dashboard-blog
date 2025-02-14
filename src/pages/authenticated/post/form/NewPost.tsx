import useMyForm from "@/components/my/form/react-hook-form";
import { postSchema } from "../schemas/zodSchema";
import Form from ".";
import actions from "@/actions";

export default function NewPost() {
  const { formMethods, onSubmit, isSubmitting } = useMyForm({
    schema: postSchema,
    mutationFn: actions.post.create,
  });

  const { data: categories } = actions.category.useGetCategoryForSelectField();

  console.log("categories", categories);

  /** state for send taptip content */
  // const [tapTipContent, setTapTipContent] = useState<string>("");

  // let { isPending: isPendingGetCategories, data: categories } =
  //   useGetCategoryForSelectField();

  // const { mutate } = usePostPost();

  // const setContentField = (html: string): void => {
  //   setTapTipContent(html);
  // };

  // const onSubmit = (data) => {
  //   const formData = new FormData();

  //   for (const key in data) {
  //     if (key === "category_id") {
  //       formData.set(key, data[key].value);
  //       continue;
  //     }
  //     formData.set(key, data[key]);
  //   }

  //   formData.set("content", tapTipContent);

  //   mutate(formData, {
  //     onSuccess: () => {
  //       console.log("onSuccess");
  //       reset();
  //       //Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: postQKeys.all });
  //     },
  //     onError: (err) => {
  //       console.log("onError: server error");
  //       if (err instanceof AxiosError && err?.response.status === 422) {
  //         const serverErrors = err?.response.data.errors;

  //         for (const key in serverErrors) {
  //           setError(key, {
  //             type: "serverError",
  //             message: serverErrors[key][0],
  //           });
  //         }
  //       }
  //     },
  //   });
  // };

  return (
    <div>
      <div>Create Post</div>
      <Form
        formMethods={formMethods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        categories={categories}
      />
    </div>
  );
}
