import { SERVICE_NAME } from "src/consts";
import winston, { format } from "winston";

function dateToLogName(dateImpl?: Date): string {
  const date = dateImpl || new Date();

  // Create the first half of the log file name
  const formattedDate = date
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    // Remove the dashes from the date
    .replace(/-/g, "");

  // Create the second half of the log file name
  const id = date.getTime().toString(36).substring(2, 8);

  // Combine the two halves to create the log file name
  const logName = `${formattedDate}-${id}`;

  return logName;
}

// Create the transports
const consoleLevel = process.env.NODE_ENV === "production" ? "warn" : "silly";

const consoleTransp = new winston.transports.Console({
  level: consoleLevel,
});

const logFileName = dateToLogName();
const fileTransp = new winston.transports.File({
  filename: `logs/${logFileName}.log`,
});

// Create the logger
const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.simple(),
    format.splat(),
  ),
  defaultMeta: { service: SERVICE_NAME },
  transports: [fileTransp, consoleTransp],
  exitOnError: true,
});

export default logger;
