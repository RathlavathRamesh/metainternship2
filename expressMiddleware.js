const express = require("express");

const app = express();

const logMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const url = req.url;

  // To Log the timestamp and requested URL
  console.log(`[${timestamp}] - Requested URL: ${url}`);

  next();
};

app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
