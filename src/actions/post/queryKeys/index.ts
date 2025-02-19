export const postQKeys = {
  all: ["posts"],
  paginate: ({ formFilters, page, pageSize, sorting }: any) => [
    ...postQKeys.all,
    "post::paginate",
    formFilters,
    page,
    pageSize,
    sorting,
  ],
  useGetPostId: (id: string) => [...postQKeys.all, id, "edit"],
};
