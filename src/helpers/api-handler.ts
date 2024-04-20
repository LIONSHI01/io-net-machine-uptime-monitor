import axios from "axios";

export const apiHandler = (apiKey: string) =>
  axios.create({
    headers: {
      Apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  });
