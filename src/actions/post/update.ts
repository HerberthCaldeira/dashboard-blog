import { putRequest } from "@/lib/axios/http";
import { TPostFormFields } from "@/pages/authenticated/post/schemas/zodSchema";

import { AxiosResponse } from "axios";

export const update = async ({
  id,
  payload,
}: {
  id: string;
  payload: TPostFormFields;
}): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await putRequest(
      `/api/post/${id}/update`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
