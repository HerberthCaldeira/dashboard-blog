import MyInput from "@/components/my/form/inputFields/MyInput";
import { MyReactSelect } from "@/components/my/form/inputFields/MyReactSelect";
import {
  FieldValues,
  FormProvider,
  FormState,
  UseFormReturn,
} from "react-hook-form";
import { TPostFormFields } from "../schemas/zodSchema";
import SubmitButton from "@/components/my/buttons/SubmitButton";

interface IParams {
  formMethods: UseFormReturn<TPostFormFields>;
  onSubmit: () => void;
  // errors: FormState<FieldValues>["errors"];
  isSubmitting: FormState<FieldValues>["isSubmitting"];
  categories: { data: { value: string; label: string }[] };
}

export default function Form({
  formMethods,
  onSubmit,
  isSubmitting,
  categories,
}: IParams) {
  return (
    <>
      <FormProvider {...formMethods}>
        <div className="container mx-auto">
          <form onSubmit={onSubmit}>
            title | content | category_id | is_published | tags |
            <div>
              <MyInput name="title" label="title" type="text" />
            </div>
            <div>
              <MyInput name="content" label="content" type="text" />
              {/* <Tiptap fnForSetValue={setContentField} /> */}
            </div>
            <div>
              <MyReactSelect
                name="category_id"
                label="Category"
                options={categories?.data}
                placeholder="Category"
              />
            </div>
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </FormProvider>
    </>
  );
}
