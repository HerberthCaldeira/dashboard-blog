export const postQKeys = {
  all: ["posts"],
  paginate: ({ formFilters, page, sorting }: any) => [
    ...postQKeys.all,
    "post::paginate",
    formFilters,
    page,
    sorting,
  ],
  useGetPostId: (id: string) => [...postQKeys.all, id, "edit"],
};
