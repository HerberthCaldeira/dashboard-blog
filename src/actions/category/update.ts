import { putRequest } from "@/lib/axios/http";
import { TCategoryFormFields } from "@/pages/authenticated/category/schemas/zodSchema";
import { AxiosResponse } from "axios";

export const update = async ({
  id,
  payload,
}: {
  id: string;
  payload: TCategoryFormFields;
}): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await putRequest(
      `/api/category/${id}/update`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
