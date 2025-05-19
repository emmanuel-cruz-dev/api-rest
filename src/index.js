const express = require("express");
const v1Router = require("./v1/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Hello desde Home</h1>
    <p>Visita la api en este <a href="http://localhost:3000/api/v1">link</a>.</p>
    `);
});
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
});
