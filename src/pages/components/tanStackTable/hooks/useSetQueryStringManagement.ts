import { ITableStateForFilter } from "@/shared/types/table-states";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface IParams extends ITableStateForFilter {
  isSuccess: boolean;
}

/**
 * change url from browser to reflect right state and query string from request
 */
export default function useSetQueryStringManagement({
  isSuccess,
  page,
  searchBar,
  sorting,
  formFilters,
}: IParams) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isSuccess) {
      console.log("useQueryStringManagement::useEffect::isSuccess");

      //SEARCH BAR
      if (searchBar == "") {
        searchParams.delete("search");
      }

      if (searchParams.get("search") != searchBar && searchBar != "") {
        searchParams.set("search", searchBar);
        searchParams.set("page", 1);
      } else {
        searchParams.set("page", page?.pageIndex);
      }
      //SORTING
      searchParams.delete("sorting");
      if (sorting.length > 0 && Object.keys(sorting[0]).length > 0) {
        searchParams.set(
          "sorting",
          `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}`,
        );
      }

      //EXTERNAL FORM
      for (let key in formFilters) {
        if (formFilters[key] == "") {
          searchParams.delete(`formFilters[${key}]`);
        }

        if (key == "createdAt" && formFilters[key] != "") {
          formFilters[key] = new Date(formFilters[key]).toISOString();
        }

        if (formFilters[key] != "") {
          searchParams.set(`formFilters[${key}]`, formFilters[key]);
        }
      }

      setSearchParams(searchParams);
    }
  }, [
    setSearchParams,
    isSuccess,
    searchParams,
    searchBar,
    page,
    sorting,
    formFilters,
  ]);
}
