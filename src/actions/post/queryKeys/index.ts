export const postQKeys = {
  all: ["posts"],
  useGetPostId: (id: string) => [...postQKeys.all, id, "edit"],
};
