import { AxiosResponse } from "axios";
import { postRequest } from "../../lib/axios/http";
import { TPostFormFields } from "@/pages/authenticated/post/schemas/zodSchema";

/**
 * Stores a new post.
 * @param data
 * @returns
 */
export const create = async (data: TPostFormFields): Promise<AxiosResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response: AxiosResponse = await postRequest("/api/post/store", data);

    return response;
  } catch (err) {
    throw err;
  }
};
