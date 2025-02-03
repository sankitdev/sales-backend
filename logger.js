import pino from "pino";
import PinoPretty from "pino-pretty";
export const logger = pino(
  {
    level: "info",
  },
  PinoPretty({
    translateTime: "yyyy-mm-dd HH:MM:ss.l",
    ignore: "pid,hostname",
    messageKey: "msg",
  })
);
