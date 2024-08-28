import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import usePostPost from "../../../../actions/post/usePostPost";
import { TPostFormFields, zodSchema } from "./zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Form/Fields/Input";
import { AxiosError } from "axios";
import { ReactSelectInput } from "../../../components/Form/Fields/select/ReactSelectInput";

export default function NewPost() {
  const methods = useForm<TPostFormFields>({
    resolver: zodResolver(zodSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const { mutate } = usePostPost();

  const onSubmit: SubmitHandler<TPostFormFields> = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "category_id") {
        formData.set(key, data[key].value);
        continue;
      }
      formData.set(key, data[key]);
    }

    mutate(formData, {
      onSuccess: () => {
        console.log("onSuccess");
        reset();
        // Invalidate and refetch
        //queryClient.invalidateQueries({ queryKey:  });
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
            </div>
            <div>
              <ReactSelectInput
                isMulti={false}
                name="category_id"
                label="Category"
                errors={errors}
                options={[
                  {
                    value: "1",
                    label: "1",
                  },
                  {
                    value: "2",
                    label: "2",
                  },
                  {
                    value: "3",
                    label: "3",
                  },
                ]}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
