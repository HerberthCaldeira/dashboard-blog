import useGetPosts from "@/actions/post/useGetPosts";
import { CreateButton } from "@/components/my/buttons/CreateButton";
import PostTable from "./PostTable";
import tableUrlParamsManagament from "@/components/my/tanStackTable/helpers/tableUrlParamsManagament";
import { useSearchParams } from "react-router-dom";
import PostTableFilter from "./PostTableFilter";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = tableUrlParamsManagament.handlePageQueryString(
    searchParams.get("page")
  );

  let sorting = tableUrlParamsManagament.extractSortingArrayFromQueryString(
    searchParams.get("sorting") ?? "id:asc"
  );

  let formFilters = {
    search: searchParams.get("formFilters[search]") ?? "",
    createdAt: searchParams.get("formFilters[createdAt]") ?? "",
    category_id: searchParams.get("formFilters[category_id]") ?? "",
  };

  const { data, error, isError, isPending } = useGetPosts({
    formFilters,
    page,
    sorting,
  });

  console.log("data", data);

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end border-2 border-indigo-400 rounded p-4">
        <CreateButton to={"/dashboard/posts/new"}>Create</CreateButton>
      </div>

      {isPending ? (
        <div>LOADING</div>
      ) : (
        <div className="mt-8 mb-8">
          <div className="border-2 border-indigo-400 rounded p-4 mb-8">
            <PostTableFilter />
          </div>
          <div className="border-2 border-indigo-400 rounded p-4">
            <PostTable posts={data} />
          </div>
        </div>
      )}
    </div>
  );
}
