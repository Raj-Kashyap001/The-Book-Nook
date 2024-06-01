const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fsPromises = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");

const logEvents = async (message, logFileName) => {
  const dateFormat = format(new Date(), "EEE dd MMM yyyy 'at' h:mm a");
  const logItem = `${dateFormat}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  const origin = req.headers.origin || "unknown origin";
  logEvents(`${req.method}\t${req.url}\t${origin}`, "reqLog.log");

  console.log(`${req.method}  ${req.path} - ${origin}`);

  next();
};

module.exports = { logger, logEvents };
