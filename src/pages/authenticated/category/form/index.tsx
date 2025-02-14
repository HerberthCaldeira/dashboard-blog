import { Button } from "@/components/ui/button";
import MyInput from "@/components/my/form/inputFields/MyInput";
import {
  FieldValues,
  FormProvider,
  FormState,
  UseFormReturn,
} from "react-hook-form";
import { TCategoryFormFields } from "../schemas/zodSchema";
import SubmitButton from "@/components/my/buttons/SubmitButton";

interface IParams {
  formMethods: UseFormReturn<TCategoryFormFields>;
  onSubmit: () => void;
  errors: FormState<FieldValues>["errors"];
  isSubmitting: FormState<FieldValues>["isSubmitting"];
}

export default function Form({ formMethods, onSubmit, isSubmitting }: IParams) {
  return (
    <>
      <div className="container mx-auto">
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <MyInput name={"name"} label={"nome"} type={"text"} />

            <div className="flex mt-2">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
