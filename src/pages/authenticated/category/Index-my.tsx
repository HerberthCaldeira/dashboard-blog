import { useSearchParams } from "react-router-dom";
import useGetCategory from "../../../actions/category/useGetCategory";
import Paginate from "../../components/paginate/Index";
import { useCallback, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import Table from "./components/table/Index";
import { CreateButton } from "@/pages/components/buttons/CreateButton";
import { Input } from "@/components/ui/input";

export default function Index() {
  console.log("category index");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(""); // controlled
  const [search, setSearch] = useState(""); // value after debounced

  const handleSearchDebounce = useCallback(
    useDebounce((e) => {
      console.log("handleSearchDebounce");
      setSearch(e.target.value);
    }, 500),
    [],
  );

  const handlerChange = (e) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
    setSearchInput(e.target.value);
    handleSearchDebounce(e);
  };

  const page = searchParams.has("page") ? searchParams.get("page") : 1;

  const { data, isError, error } = useGetCategory({ page, search });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex">
        <Input
          placeholder="SEARCH"
          name="search"
          value={searchInput}
          type="text"
          onChange={handlerChange}
        />
        <div className="ml-auto">
          <CreateButton to={"/dashboard/category/new"}>new</CreateButton>
        </div>
      </div>
      <Table data={data?.data} />
      <Paginate data={data} />
    </div>
  );
}
