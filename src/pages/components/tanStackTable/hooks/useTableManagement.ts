import { useCallback, useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { handlePageQueryString } from "@/lib/utils";

const useTableManagement = (delay = 500) => {
  const defaultData = useMemo(() => [], []);

  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    pageIndex: handlePageQueryString(searchParams.get("page")),
    pageSize: 15,
  });

  const [searchBar, setSearchBar] = useState(
    searchParams.has("search") ? searchParams.get("search") : "",
  );

  console.log("q", searchParams.get("sorting"));

  const [sorting, setSorting] = useState([
    searchParams.has("sorting")
      ? {
          id: searchParams.get("sorting")?.split(":")[0],
          desc:
            searchParams.get("sorting")?.split(":")[1] == "desc" ? true : false,
        }
      : { id: "id", desc: false },
  ]);

  const [visualSearchForInput, setVsearch] = useState(
    searchParams.has("search") ? searchParams.get("search") : "",
  );

  const debounced = useCallback(
    useDebounce((e) => {
      setPagination((prev) => {
        return { ...prev, pageIndex: 1 };
      });

      setSearchBar(e.target.value);
    }, delay),
    [],
  );

  const handlerSearch = (e) => {
    setVsearch(e.target.value);
    debounced(e);
  };

  return {
    defaultData,
    searchBar,
    setSearchBar,
    sorting,
    setSorting,
    visualSearchForInput,
    handlerSearch,
    pagination,
    setPagination,
  };
};

export default useTableManagement;
