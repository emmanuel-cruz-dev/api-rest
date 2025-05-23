const express = require("express");
const apicache = require("apicache");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes.js");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger.js");

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));

app.get("/", (req, res) => {
  res.send(`
    <h1>Hello desde Home</h1>
    <p>Visita la api en este <a href="http://localhost:3000/api/v1/workouts">link</a>.</p>
    `);
});

app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
  V1SwaggerDocs(app, PORT);
});
