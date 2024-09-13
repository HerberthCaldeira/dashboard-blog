export const categoryKeys = {
  paginate: (page: number, search: string) => [
    "category::paginate",
    page,
    search,
  ],
  useGetCategoryById: (id: string) => ["category", id, "edit"],
  select: ["category", "select"],
};
