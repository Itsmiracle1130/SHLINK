
import { createLogger, transports, format } from "winston";

const logger = createLogger({
    transports: [
        new transports.File({
          dirname: "logs",
          filename: "shlink.log",
        }),
        new transports.Console()
      ],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    defaultMeta: {
        service: "shlink_log",
    }
});

export default logger