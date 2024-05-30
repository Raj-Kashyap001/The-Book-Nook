const express = require("express");
const { Router } = express;
const path = require("node:path");

const router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
  res.contentType("text/html");
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

module.exports = router;
