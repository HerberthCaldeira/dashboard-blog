import { useSearchParams } from "react-router-dom";
import actions from "@/actions";
import CategoryTableFilter from "./categoryTableFilter";
import CategoryTable from "./categoryTable";
import tableUrlParamsManagament from "@/components/my/tanStackTable/helpers/tableUrlParamsManagament";
import { CreateButton } from "@/components/my/buttons/CreateButton";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  let formFilters = {
    search: searchParams.get("formFilters[search]") ?? "",
    createdAt: searchParams.get("formFilters[createdAt]") ?? "",
  };

  let page = tableUrlParamsManagament.handlePageQueryString(
    searchParams.get("page")
  );

  let sorting = tableUrlParamsManagament.extractSortingArrayFromQueryString(
    searchParams.get("sorting") ?? "id:asc"
  );

  const {
    data: apiResponse,
    isError,
    error,
    isPending,
  } = actions.category.useGetCategories({
    formFilters,
    page,
    sorting,
  });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="m-8">
      <CreateButton to="/dashboard/category/new">Create</CreateButton>

      <CategoryTableFilter />

      {isPending ? (
        <div>Loading...</div>
      ) : (
        <CategoryTable apiResponse={apiResponse} />
      )}
    </div>
  );
}
