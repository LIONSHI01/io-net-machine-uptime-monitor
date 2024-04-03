import { DeviceConditions } from "../utils/types";

class Logger {
  constructor() {}

  log(msg: string) {
    console.log(msg);
  }

  serverDetails(details: DeviceConditions) {
    const { status, device_id } = details || {};
    console.log(`Machine ${device_id} is ${status}`);
  }

  serverError(error: string) {
    console.log(`Io.net error: ${error}`);
  }
}
const logger = new Logger();

export default logger;
