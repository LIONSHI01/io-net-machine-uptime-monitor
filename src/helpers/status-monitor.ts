import { type AxiosInstance } from "axios";

import { ServerResponse } from "../utils/types";
import logger from "./logger";

export const checkUptime = async (handler: AxiosInstance, deviceId: string) => {
  const baseUrl = process.env.IONET_BASE_URL;
  const pathname = `/${deviceId}/summary`;
  const url = baseUrl + pathname;

  try {
    const response: ServerResponse = await handler.get(url);
    return response;
  } catch (e: any) {
    if (e?.response?.data === "Internal Server Error") {
      logger.serverError(e.response.data);
    } else {
      console.log(e);
    }
  }
};
