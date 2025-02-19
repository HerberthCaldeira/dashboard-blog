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

  let pageSize = tableUrlParamsManagament.handlePageSizeQueryString(
    searchParams.get("page_size")
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
    pageSize,
    sorting,
  });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end border-2 border-indigo-400 rounded p-4">
        <CreateButton to="/dashboard/category/new">Create</CreateButton>
      </div>

      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 mb-8">
          <div className="border-2 border-indigo-400 rounded p-4 mb-8">
            <CategoryTableFilter />
          </div>
          <div className="border-2 border-indigo-400 rounded p-4 ">
            <CategoryTable apiResponse={apiResponse} />
          </div>
        </div>
      )}
    </div>
  );
}
