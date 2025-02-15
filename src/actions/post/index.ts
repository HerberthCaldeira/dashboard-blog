import { create } from "./create";
import { postQKeys } from "./queryKeys";
import { update } from "./update";
import useGetPosts from "./useGetPosts";
import useGetPostById from "./useGetPostById";
import useDeletePost from "./useDeletePost";

export default {
  create,
  useGetPosts,
  useGetPostById,
  querykeys: postQKeys,
  update,
  useDeletePost,
};
