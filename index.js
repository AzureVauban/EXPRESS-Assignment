// Run in terminal: npm init -y && npm install express
const express = require("express");
const app = express();
const PORT = 3003;

app.use(express.json());

// Add minimal CORS handler as specified [5]
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  );
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
