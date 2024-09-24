export const categoryKeys = {
  paginate: (
    page: string,
    search: string | null,
    sorting: string,
    formFilters: object,
  ) => ["category::paginate", page, search, sorting, formFilters],
  useGetCategoryById: (id: string) => ["category", id, "edit"],
  select: ["category", "select"],
};
