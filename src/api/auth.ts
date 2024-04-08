import { resolve } from "path";
import fs from "fs";

import { AxiosInstance } from "axios";
import { RefreshTokenResponse } from "../utils/types";

export const getRefreshToken = async (
  handler: AxiosInstance,
  refreshToken: string
) => {
  const authTokenStorePath = resolve("./src/auth-data/auth_tokens.json");

  try {
    const response: RefreshTokenResponse = await handler.post(
      "https://id.io.net/auth/v1/token?grant_type=refresh_token",
      {
        refresh_token: refreshToken,
      }
    );
    if (response.data) {
      const authTokens = {
        refreshToken: response.data.refresh_token,
        accessToken: response.data.access_token,
      };

      // Save access token and refresh token
      const dataToSave = JSON.stringify(authTokens, null, 2);
      fs.writeFileSync(authTokenStorePath, dataToSave);
    }

    return response;
  } catch (e) {
    console.log(e);
  }
};
