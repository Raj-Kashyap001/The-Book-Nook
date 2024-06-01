const express = require("express");
const path = require("node:path");
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require(path.join(__dirname, "routes", "init.js")));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found!" });
  } else {
    res.type("txt").send("404 not found!");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
