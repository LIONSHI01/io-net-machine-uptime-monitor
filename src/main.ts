import dotenv from "dotenv";

import { runCommand } from "./helpers/command-processor";
import { checkUptime } from "./helpers/status-monitor";
import { apiHandler } from "./helpers/api-handler";
import logger from "./helpers/logger";

dotenv.config({
  path: ".env",
});

const command = process.env.COMMAND;
const deviceId = process.env.DEVICE_ID;
const runInterval = process.env.RUN_INTERVAL_IN_MIN;
const credentialToken = process.env.TOKEN;

const handler = apiHandler(credentialToken);

const main = async () => {
  const res = await checkUptime(handler, deviceId);
  if (res?.data?.status === "succeeded") {
    const machineDetails = res.data.data;
    const { status } = machineDetails || {};

    logger.common(machineDetails);

    if (status === "down") {
      runCommand(command);
    }
  }
};

main();

setInterval(main, Number(runInterval) * 60 * 1000);
