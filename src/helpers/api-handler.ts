import axios from "axios";

export const apiHandler = (token: string) =>
  axios.create({
    headers: {
      Token: token,
    },
  });
