import { type AxiosInstance } from "axios";

import { ServerResponse } from "../utils/types";
import logger from "../helpers/logger";

export const checkUptime = async (
  handler: AxiosInstance,
  authToken: string,
  deviceId: string
) => {
  const baseUrl = process.env.IONET_BASE_URL;
  const pathname = `/${deviceId}/summary`;
  const url = baseUrl + pathname;

  try {
    const response: ServerResponse = await handler.get(url, {
      headers: {
        Token: authToken,
      },
    });
    return response;
  } catch (e: any) {
    if (e?.response?.data === "Internal Server Error") {
      logger.serverError(e.response.data);
    } else {
      console.log(e);
    }
  }
};
