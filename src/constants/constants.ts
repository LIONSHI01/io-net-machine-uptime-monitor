import { logger, retrieveEnvVariable } from "../utils";

export const COMMAND = retrieveEnvVariable("COMMAND", logger);
export const DEVICE_ID = retrieveEnvVariable("DEVICE_ID", logger);
export const RUN_INTERVAL_IN_MIN = retrieveEnvVariable(
  "RUN_INTERVAL_IN_MIN",
  logger
);
export const API_TOKEN = retrieveEnvVariable("API_TOKEN", logger);
export const TELEGRAM_CHAT_ROOM_ID = Number(
  retrieveEnvVariable("TELEGRAM_CHAT_ROOM_ID", logger)
);
export const TELEGRAM_BOT_TOKEN = retrieveEnvVariable(
  "TELEGRAM_BOT_TOKEN",
  logger
);
