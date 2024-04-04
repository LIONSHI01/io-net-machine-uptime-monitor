import { AxiosInstance } from "axios";
import { RefreshTokenResponse } from "../utils/types";

export const getRefreshToken = async (
  handler: AxiosInstance,
  refreshToken: string
) => {
  try {
    const response: RefreshTokenResponse = await handler.post(
      "https://id.io.net/auth/v1/token?grant_type=refresh_token",
      {
        refresh_token: refreshToken,
      }
    );

    return response;
  } catch (e) {
    console.log(e);
  }
};
