import { putRequest } from "@/lib/axios/http";
import { TCategoryFormFields } from "@/pages/authenticated/category/schemas/zodSchema";

export const update = async ({
  id,
  payload,
}: {
  id: string;
  payload: TCategoryFormFields;
}) => {
  try {
    const response = await putRequest(`/api/category/${id}/update`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};
