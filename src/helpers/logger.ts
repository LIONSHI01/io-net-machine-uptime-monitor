import { DeviceConditions } from "../utils/types";

class Logger {
  constructor() {}

  common(details: DeviceConditions) {
    const { status, device_id, device_name } = details || {};
    console.log(`Machine ${device_name}(${device_id}) is ${status}`);
  }

  serverError(error: string) {
    console.log(`Io.net error: ${error}`);
  }
}
const logger = new Logger();

export default logger;