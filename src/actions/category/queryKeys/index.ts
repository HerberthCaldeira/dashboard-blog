export const categoryKeys = {
  paginate: (page: number, search: string | null, externalFilters: object) => [
    "category::paginate",
    page,
    search,
    externalFilters,
  ],
  useGetCategoryById: (id: string) => ["category", id, "edit"],
  select: ["category", "select"],
};
