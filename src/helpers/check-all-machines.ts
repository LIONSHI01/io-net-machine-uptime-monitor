import fs from "fs";
import { resolve } from "path";
import { AxiosInstance } from "axios";
import { apiHandler } from "./api-handler";
import { readCsv } from "./read-file";
import { checkUptime } from "../api/status-monitor";
import { getRefreshToken } from "../api/auth";

type MachineRecord = {
  server: string;
  deviceId: string;
};

export const checkAllMachines = async (apiHandler: AxiosInstance) => {
  const authTokenStorePath = resolve("./src/auth-data/auth_tokens.json");
  const machineFilePath = resolve("./src/machines.csv");

  const authTokenData = fs.readFileSync(authTokenStorePath, "utf-8");
  const authTokens = JSON.parse(authTokenData);

  const machineList: MachineRecord[] = await readCsv(machineFilePath);

  try {
    const response = await getRefreshToken(apiHandler, authTokens.refreshToken);
    const authToken = response.data.access_token;

    for (const item of machineList) {
      const uptimeRes = await checkUptime(apiHandler, authToken, item.deviceId);
      const deviceDetails = uptimeRes?.data.data;

      console.log(
        `Machine ${item.server} -  ${deviceDetails?.device_id} : ${deviceDetails?.status}`
      );
    }
  } catch (e) {
    console.log(e);
  }
};
