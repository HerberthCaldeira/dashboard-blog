import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import usePostPost from "../../../../actions/post/usePostPost";

import { zodSchema } from "./zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorValidationMessage from "../../../components/Form/ErrorValidationMessage";

export default function NewPost() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodSchema) });

  const { mutate, error: serverErrors } = usePostPost();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <div>New Post</div>
      <div>
        <Link to={"/dashboard/posts/new"}>New</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          title | content | category_id | is_published | tags |
          <div>
            <label> Titulo </label>
            <input {...register("title")} />
            <ErrorValidationMessage
              frontErrors={errors}
              serverErrors={serverErrors}
              field="title"
            />
          </div>
          <div>
            <label> content </label>
            <input {...register("content")} />
            <ErrorValidation
              frontErrors={errors}
              serverErrors={serverErrors}
              field="content"
            />
          </div>
          <div>
            <label> category </label>
            <input {...register("category_id")} />
            <ErrorValidation
              frontErrors={errors}
              serverErrors={serverErrors}
              field="category_id"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
