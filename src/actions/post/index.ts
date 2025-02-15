import { create } from "./create";
import { postQKeys } from "./queryKeys";
import { update } from "./update";
import useGetPost from "./useGetPost";
import useGetPostById from "./useGetPostById";

export default {
  create,
  useGetPost,
  useGetPostById,
  keys: postQKeys,
  update,
};
