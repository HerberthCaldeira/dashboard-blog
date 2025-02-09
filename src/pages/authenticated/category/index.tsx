import { Link, useSearchParams } from "react-router-dom";
import actions from "@/actions";
import CategoryTableFilter from "./categoryTableFilter";
import CategoryTable from "./categoryTable";
import { queryStringToArray } from "@/components/my/tanStackTable/utils";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  let formFilters = {
    search: searchParams.get("formFilters[search]") ?? "",
    createdAt: searchParams.get("formFilters[createdAt]") ?? "",
  };

  let page = searchParams.get("page") ?? "1";

  let sorting = queryStringToArray(searchParams.get("sorting") ?? "id:asc");

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
      <Link to={"/dashboard/category/new"}>New</Link> | pagination:
      <CategoryTableFilter />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <CategoryTable apiResponse={apiResponse} />
      )}
    </div>
  );
}
