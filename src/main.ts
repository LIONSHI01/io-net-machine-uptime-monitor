import fs from "fs";
import dotenv from "dotenv";

import { runCommand } from "./helpers/command-processor";
import { checkUptime } from "./api/status-monitor";
import { apiHandler } from "./helpers/api-handler";
import logger from "./helpers/logger";
import { getRefreshToken } from "./api/auth";
import { checkAllMachines } from "./helpers/check-all-machines";
import { resolve } from "path";

dotenv.config({
  path: ".env",
});

const command = process.env.COMMAND;
const deviceId = process.env.DEVICE_ID;
const runInterval = process.env.RUN_INTERVAL_IN_MIN;
const apiKeyToken = process.env.API_TOKEN;

const handler = apiHandler(apiKeyToken);

// const main = async () => {
//   const authTokenStorePath = resolve("./src/auth-data/auth_tokens.json");
//   const authTokenData = fs.readFileSync(authTokenStorePath, "utf-8");
//   const authTokens = JSON.parse(authTokenData);

//   // get access token
//   const loginResponse = await getRefreshToken(handler, authTokens.refreshToken);
//   const accessToken = loginResponse.data.access_token;
//   const serverUptimeResponse = await checkUptime(
//     handler,
//     accessToken,
//     deviceId
//   );

//   if (serverUptimeResponse?.data?.status === "succeeded") {
//     const machineDetails = serverUptimeResponse.data.data;
//     const { status } = machineDetails || {};

//     logger.serverDetails(machineDetails);

//     if (status === "down") {
//       runCommand(command);
//     }
//   }
// };
checkAllMachines(handler);
// First run
// main();

// Repeat running
// setInterval(main, Number(runInterval) * 60 * 1000);
