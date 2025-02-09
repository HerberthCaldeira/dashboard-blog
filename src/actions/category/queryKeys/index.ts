export const categoryKeys = {
  all: ["category::all"],
  paginate: ({ formFilters, page, sorting }: any) => [
    ...categoryKeys.all,
    "category::paginate",
    formFilters,
    page,
    sorting,
  ],

  useGetCategoryById: (id: string) => ["category", id, "edit"],

  select: ["category", "select"],
};
