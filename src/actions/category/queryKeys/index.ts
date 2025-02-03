export const categoryKeys = {
  all: ["category::all"],
  paginate: (
    page: string,
    search: string | null,
    sorting: string,
    formFilters: object
  ) => [
    ...categoryKeys.all,
    "category::paginate",
    page,
    search,
    sorting,
    formFilters,
  ],

  useGetCategoryById: (id: string) => ["category", id, "edit"],

  select: ["category", "select"],
};
