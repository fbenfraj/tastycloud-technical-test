const express = require("express");
const cors = require("cors");

require("./db/database");
const itemRouter = require("./routers/item");
const categoryRouter = require("./routers/category");

const app = express();

app.get("/ping", (req, res) => {
  res.send("I'm alive :)");
});

app.use(cors());
app.use(express.json());

app.use(itemRouter);
app.use(categoryRouter);

module.exports = app;
