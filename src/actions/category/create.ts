import { postRequest } from "@/lib/axios/http";
import { TCategoryFormFields } from "@/pages/authenticated/category/schemas/zodSchema";
import { AxiosResponse } from "axios";

export const create = async (
  data: TCategoryFormFields
): Promise<AxiosResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response: AxiosResponse = await postRequest(
      "/api/category/store",
      data
    );

    return response;
  } catch (err) {
    throw err;
  }
};
