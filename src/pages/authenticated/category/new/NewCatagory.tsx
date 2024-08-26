import { FormProvider, useForm } from "react-hook-form";
import usePostCategory from "../../../../actions/category/usePostCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSchema } from "./zodSchema";
import Input from "../../../components/Form/Fields/Input";

export default function NewCatagory() {
  const methods = useForm({ resolver: zodResolver(zodSchema) });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate, error: serverErrors } = usePostCategory();

  console.log("serverErrors", serverErrors);

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    mutate(data);
  };

  return (
    <>
      <div>NewCatagory</div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name={"name"}
              label={"nome"}
              type={"text"}
              frontErrors={errors}
              serverErrors={serverErrors}
            />

            <button type="submit"> SUBMIT </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
