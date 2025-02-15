import MyInput from "@/components/my/form/inputFields/MyInput";
import { MyReactSelect } from "@/components/my/form/inputFields/MyReactSelect";
import {
  FieldValues,
  FormProvider,
  FormState,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { ICategoryOptions, TPostFormFields } from "../schemas/zodSchema";
import SubmitButton from "@/components/my/buttons/SubmitButton";
import { MyEditorText } from "@/components/my/form/inputFields/MyEditorText";
import MyCheckbox from "@/components/my/form/inputFields/MyCheckbox";

interface IParams {
  formMethods: UseFormReturn<TPostFormFields>;
  onSubmit: () => void;
  isSubmitting: FormState<FieldValues>["isSubmitting"];
  categories: ICategoryOptions;
}

export default function Form({
  formMethods,
  onSubmit,
  isSubmitting,
  categories,
}: IParams) {
  const {
    getValues,
    formState: { errors },
  } = formMethods;

  console.log("getValues::errors", getValues(), errors);

  return (
    <>
      <FormProvider {...formMethods}>
        <div className="container mx-auto p-4 bg-white rounded shadow-md">
          <form onSubmit={onSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Formulário</h2>
            title | content | category_id | is_published | tags |
            <div className="mt-2">
              <MyInput
                name="title"
                label="title"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-2">
              <MyReactSelect
                name="category_id"
                label="Category"
                options={categories?.data}
                placeholder="Category"
              />
            </div>
            <div className="mt-2">
              <MyEditorText name="content" placeholder="Content" />
            </div>
            <div className="mt-2">
              <MyCheckbox name="is_published" label="is_published" />
            </div>
            <div className="text-right">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
}
