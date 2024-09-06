import { Link, useSearchParams } from "react-router-dom";
import useGetCategory from "../../../actions/category/useGetCategory";
import Table from "./components/table/Table";
import Paginate from "../../components/form/paginate/Paginate";
import { useCallback, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

export default function Index() {
  console.log("render categ index");

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

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const { data, isError, error } = useGetCategory({ page, search });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  // <pre>{JSON.stringify(data, null, 2)}</pre>
  return (
    <div>
      <div>
        Category {page} || {searchParams.get("page")}
      </div>
      <div>
        <Link to={"/dashboard/category/new"}>New</Link>
      </div>
      <label htmlFor="search">SEARCH</label>
      <input
        name="search"
        value={searchInput}
        type="text"
        onChange={handlerChange}
      />{" "}
      {search}
      <Table data={data} />
      <Paginate data={data} />
    </div>
  );
}
