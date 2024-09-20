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

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.has("search") ? searchParams.get("search") : "",
  );
  
  const [visualSearchForInput, setVsearch] = useState(
    searchParams.has("search") ? searchParams.get("search") : "",
  );

  const debounced = useCallback(
    useDebounce((e) => {
      setPagination((prev) => {
        return { ...prev, pageIndex: 1 };
      });

      setGlobalFilter(e.target.value);
    }, delay),
    [],
  );

  const handlerSearch = (e) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);

    searchParams.set("page", 1);
    setSearchParams(searchParams);

    setVsearch(e.target.value);

    debounced(e);
  };

  return {
    defaultData,
    globalFilter,
    setGlobalFilter,
    visualSearchForInput,
    handlerSearch,
    pagination,
    setPagination,
  };
};

export default useTableManagement;
