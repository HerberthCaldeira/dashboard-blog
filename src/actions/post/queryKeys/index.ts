export const postQKeys = {
  all: ["posts"],
  paginate: ({ sorting, page }: any) => [
    ...postQKeys.all,
    "post::paginate",
    sorting,
    page,
  ],
  useGetPostId: (id: string) => [...postQKeys.all, id, "edit"],
};
