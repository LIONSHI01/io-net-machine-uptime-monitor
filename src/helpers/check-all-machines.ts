import fs from "fs";
import { resolve } from "path";
import { AxiosInstance } from "axios";
import { readCsv } from "./read-file";
import { checkUptime } from "../api/status-monitor";
import { getRefreshToken } from "../api/auth";
import { bot } from "../telegram";
import { TELEGRAM_CHAT_ROOM_ID } from "../constants";
import { logger } from "../utils";

type MachineRecord = {
  server: string;
  deviceId: string;
};

export const checkAllMachines = async (
  apiHandler: AxiosInstance,
  showMsg: boolean = false
) => {
  logger.info("Checking all machines...");

  const authTokenStorePath = resolve("./src/auth-data/auth_tokens.json");
  const machineFilePath = resolve("./src/machines.csv");

  const authTokenData = fs.readFileSync(authTokenStorePath, "utf-8");
  const authTokens = JSON.parse(authTokenData);

  const machineList: MachineRecord[] = await readCsv(machineFilePath);

  const token = process.env.AUTH_TOKEN;
  try {
    // const response = await getRefreshToken(apiHandler, authTokens.refreshToken);
    // const authToken = response.data.access_token;

    for (const item of machineList) {
      const uptimeRes = await checkUptime(apiHandler, token, item.deviceId);

      const deviceDetails = uptimeRes?.data.data;

      const tgMsg = `Machine ${item.server} -  ${deviceDetails?.device_id} : ${deviceDetails?.status}`;
      if (deviceDetails.status === "down") {
        logger.warn(
          `Machine ${item.server} -  ${deviceDetails?.device_id} : ${deviceDetails?.status}`
        );

        // Notification on TG
        if (showMsg) {
          bot.telegram.sendMessage(TELEGRAM_CHAT_ROOM_ID, tgMsg);
        }
      } else {
        logger.info(
          `Machine ${item.server} -  ${deviceDetails?.device_id} : ${deviceDetails?.status}`
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};
