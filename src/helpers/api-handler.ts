import axios from "axios";

// https://id.io.net/auth/v1/token?grant_type=refresh_token

export const apiHandler = (apiKey: string) =>
  axios.create({
    headers: {
      Apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  });
