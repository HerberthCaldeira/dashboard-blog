import actions from "@/actions";
import MyCalendar from "@/components/my/form/inputFields/MyCalendar";
import MyInput from "@/components/my/form/inputFields/MyInput";
import { MyReactSelect } from "@/components/my/form/inputFields/MyReactSelect";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function PostTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories } = actions.category.useGetCategoryForSelectField();

  const formFilterMethods = useForm({
    defaultValues: {
      search: searchParams.get("formFilters[search]") ?? "",
      createdAt: searchParams.get("formFilters[createdAt]") ?? "",
      category_id: searchParams.get("formFilters[category_id]")
        ? JSON.parse(searchParams.get("formFilters[category_id]") ?? "")
        : "",
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

      data.category_id
        ? state.set(
            "formFilters[category_id]",
            JSON.stringify({
              value: data.category_id.value,
              label: data.category_id.label,
            })
          )
        : state.delete("formFilters[category_id]");

      state.set("page", "1"); //make sure the table starts from the first page

      return state;
    });
  };

  return (
    <div className="">
      <FormProvider {...formFilterMethods}>
        <form onSubmit={formFilterMethods.handleSubmit(handlerSubmit)}>
          <div className="grid grid-cols-3 gap-2">
            <MyCalendar name="createdAt" />

            <MyReactSelect
              name="category_id"
              label="Category"
              options={categories?.data || []}
              placeholder="Category"
            />

            <MyInput type="text" name={"search"} label={"search"} />
          </div>

          <div className="flex justify-end">
            <div>
              <Button type="submit">submit</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
