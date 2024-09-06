import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import usePostPost from "../../../../actions/post/usePostPost";
import { TPostFormFields, zodSchema } from "./zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/form/fields/Input";
import { AxiosError } from "axios";
import { ReactSelectInput } from "../../../components/form/fields/select/ReactSelectInput";
import { postQKeys } from "../../../../actions/post/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import Tiptap from "../../../components/form/editor/TipTap";
import { useState } from "react";
import useGetCategoryForSelectField from "../../../../actions/category/useGetCategoryForSelectField";

export default function NewPost() {
  /** state for send taptip content */
  const [tapTipContent, setTapTipContent] = useState<string>("");

  const queryClient = useQueryClient();

  let { isPending: isPendingGetCategories, data: categories } =
    useGetCategoryForSelectField();

  console.log(categories);

  const methods = useForm<TPostFormFields>({
    resolver: zodResolver(zodSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { mutate } = usePostPost();

  const setContentField = (html: string): void => {
    setTapTipContent(html);
  };

  const onSubmit: SubmitHandler<TPostFormFields> = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "category_id") {
        formData.set(key, data[key].value);
        continue;
      }
      formData.set(key, data[key]);
    }

    formData.set("content", tapTipContent);

    mutate(formData, {
      onSuccess: () => {
        console.log("onSuccess");
        reset();
        //Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: postQKeys.all });
      },
      onError: (err) => {
        console.log("onError: server error");
        if (err instanceof AxiosError && err?.response.status === 422) {
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
    <div>
      <div>New Post</div>
      <div>
        <Link to={"/dashboard/posts/new"}>New</Link>
      </div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            title | content | category_id | is_published | tags |
            <div>
              <Input name="title" label="title" type="text" errors={errors} />
            </div>
            <div>
              <Input
                name="content"
                label="content"
                type="text"
                errors={errors}
              />
              <Tiptap fnForSetValue={setContentField} />
            </div>
            <div>
              <ReactSelectInput
                isMulti={false}
                name="category_id"
                label="Category"
                errors={errors}
                options={categories?.data}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
