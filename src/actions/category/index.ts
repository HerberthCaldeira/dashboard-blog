import { create } from "./create";
import { categoryKeys } from "./queryKeys";
import { update } from "./update";
import useDeleteCategory from "./useDeleteCategory";
import useGetCategories from "./useGetCategories";
import useGetCategoryById from "./useGetCategoryById";
import useGetCategoryForSelectField from "./useGetCategoryForSelectField";

export default {
  create,
  update,
  useGetCategories,
  useGetCategoryById,
  useDeleteCategory,
  useGetCategoryForSelectField,
  querykeys: categoryKeys,
};
