import useGetPosts from "@/actions/post/useGetPosts";
import { CreateButton } from "@/components/my/buttons/CreateButton";
import PostTable from "./PostTable";
import tableUrlParamsManagament from "@/components/my/tanStackTable/helpers/tableUrlParamsManagament";
import { useSearchParams } from "react-router-dom";
import PostTableFilter from "./PostTableFilter";
import category from "@/actions/category";

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
    <div className="m-8">
      <CreateButton to={"/dashboard/posts/new"}>Create</CreateButton>

      {isPending ? (
        <div>LOADING</div>
      ) : (
        <div>
          <PostTableFilter />
          <PostTable posts={data} />
        </div>
      )}
    </div>
  );
}
