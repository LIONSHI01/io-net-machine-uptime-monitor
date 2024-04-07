import dotenv from "dotenv";

import { runCommand } from "./helpers/command-processor";
import { checkUptime } from "./api/status-monitor";
import { apiHandler } from "./helpers/api-handler";
import logger from "./helpers/logger";
import { getRefreshToken } from "./api/auth";
import { checkAllMachines } from "./helpers/check-all-machines";

dotenv.config({
  path: ".env",
});

const command = process.env.COMMAND;
const deviceId = process.env.DEVICE_ID;
const runInterval = process.env.RUN_INTERVAL_IN_MIN;
const credentialToken = process.env.TOKEN;
const apiKeyToken = process.env.API_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;

const handler = apiHandler(apiKeyToken);

const main = async () => {
  // get refresh token

  // get access token

  // check if single machine up

  // if down, run restart command

  // const response = await getRefreshToken(handler, refreshToken);
  // if (response.data) {
  //   const authToken = response.data.access_token;
  //   const res = await checkUptime(handler, authToken, deviceId);
  //   if (res?.data?.status === "succeeded") {
  //     const machineDetails = res.data.data;
  //     const { status } = machineDetails || {};

  //     logger.common(machineDetails);

  //     if (status === "down") {
  //       runCommand(command);
  //     }
  //   }
  // }

  await checkAllMachines(handler);
};

main();

// setInterval(main, Number(runInterval) * 60 * 1000);
