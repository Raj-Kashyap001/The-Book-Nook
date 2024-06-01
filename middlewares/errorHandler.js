const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t ${req.method}\t${
      req.headers.origin || "unknown origin"
    }`,
    "errorLog.log"
  );

  console.log(err.stack); // for debugging
  const status = res.statusCode ? res.statusCode : 500; //server error
  res.json({ error: err.message, status });
};

module.exports = errorHandler;
