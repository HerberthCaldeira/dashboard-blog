import MyCalendar from "@/components/my/form/inputFields/MyCalendar";
import MyInput from "@/components/my/form/inputFields/MyInput";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { ICategoryFormFilters } from "./types";

export default function CategoryTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formFilterMethods = useForm<ICategoryFormFilters>({
    defaultValues: {
      search: searchParams.get("formFilters[search]") ?? "",
      createdAt: searchParams.get("formFilters[createdAt]") ?? "",
    },
  });

  const handlerSubmit = (data: any) => {
    console.log("handlerSubmitFilter", data);

    setSearchParams((state) => {
      data.search
        ? state.set("formFilters[search]", data.search)
        : state.delete("formFilters[search]");
      data.createdAt
        ? state.set(
            "formFilters[createdAt]",
            new Date(data.createdAt).toISOString()
          )
        : state.delete("formFilters[createdAt]");

      return state;
    });
  };

  return (
    <div>
      CategoryFilter
      <div className="border-2 border-indigo-400">
        <FormProvider {...formFilterMethods}>
          <form onSubmit={formFilterMethods.handleSubmit(handlerSubmit)}>
            <div className="flex ">
              <MyCalendar name="createdAt" />
              <MyInput type="text" name={"search"} label={"search"} />
              <Button type="submit">submit</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
