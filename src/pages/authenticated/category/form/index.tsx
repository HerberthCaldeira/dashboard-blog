import { Button } from "@/components/ui/button";
import MyInput from "@/components/my/form/inputFields/MyInput";
import { FormProvider } from "react-hook-form";

export default function Form(props: any) {
  const { formMethods, onSubmit, errors, isSubmitting } = props;

  return (
    <>
      <div className="container mx-auto">
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <MyInput
              name={"name"}
              label={"nome"}
              type={"text"}
              errors={errors}
            />

            <div className="flex mt-2">
              <Button variant="outline" type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
