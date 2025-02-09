const isInteger = (value: any) => {
  return /^\d+$/.test(value);
};

// const decodeSorting = (sortingString) => {
//   return sortingString.split("&").map((sort) => {
//     const [id, order] = decodeURIComponent(sort).split(":");
//     return { id, desc: order === "desc" };
//   });
// };

/***
 * Get a query string that represents the sorting state and decode it to an array
 * @param queryString {string}
 * @returns {Array}
 * @example
 * extractSortingArrayFromQueryString("id:asc&name:desc") => [{id: "id", desc: false}, {id: "name", desc: true}]
 */
const extractSortingArrayFromQueryString = (queryString: string) => {
  const searchParams = new URLSearchParams(queryString);
  const sorting = [];

  for (const [key, value] of searchParams.entries()) {
    const [column, order] = key.split(":");
    sorting.push({
      id: column,
      desc: order === "desc",
    });
  }

  return sorting;
};

/**
 * Transform an array of { id: string, desc: boolean } to a query string
 * @param array
 * @returns {string}
 * @example
 * setSortingQueryString([{id: "id", desc: false}, {id: "name", desc: true}]) => "id:asc&name:desc"
 */
const makeQueryStringFromSortingArray = (array: Array<any>) => {
  return array
    .map((obj) => {
      return `${encodeURIComponent(obj.id)}:${obj.desc ? "desc" : "asc"}`;
    })
    .join("&");
};

/**
 *  Transform a query string to a page number
 * @param page
 * @returns {int}
 */
const handlePageQueryString = (page: string | null): number => {
  if (page == null || !isInteger(page)) return 1;
  const p = parseInt(page);
  return p == 0 ? 1 : p;
};

export default {
  handlePageQueryString,
  extractSortingArrayFromQueryString,
  makeQueryStringFromSortingArray,
};
