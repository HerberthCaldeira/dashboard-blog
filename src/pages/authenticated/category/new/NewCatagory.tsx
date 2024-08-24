import { useForm } from "react-hook-form";
import { usePostCategory } from "../../../../actions/category/usePostCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSchema } from "./zodSchema";

export default function NewCatagory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodSchema) });

  const { mutate } = usePostCategory();

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    mutate(data);
  };
  return (
    <>
      <div>NewCatagory</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          {errors.name && errors.name?.message}

          <button type="submit"> SUBMIT </button>
        </form>
      </div>
    </>
  );
}
