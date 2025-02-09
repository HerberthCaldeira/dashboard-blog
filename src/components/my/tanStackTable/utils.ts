const isInteger = (value: any) => {
  return /^\d+$/.test(value);
};

export const queryStringToArray = (queryString) => {
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

export const arrayToQueryString = (array: Array<any>) => {
  return array
    .map((obj) => {
      return `${encodeURIComponent(obj.id)}:${obj.desc ? "desc" : "asc"}`;
    })
    .join("&");
};

export const decodeSorting = (sortingString) => {
  return sortingString.split("&").map((sort) => {
    const [id, order] = decodeURIComponent(sort).split(":");
    return { id, desc: order === "desc" };
  });
};

export const handlePageQueryString = (page: string | null): number => {
  if (page == null || !isInteger(page)) return 1;
  const p = parseInt(page);
  return p == 0 ? 1 : p;
};
