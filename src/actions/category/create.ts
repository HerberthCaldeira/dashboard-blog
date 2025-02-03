import { postRequest } from "@/lib/axios/http";
import { TCategoryFormFields } from "@/pages/authenticated/category/schemas/zodSchema";

export const create = async (data: TCategoryFormFields) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await postRequest("/api/category/store", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
