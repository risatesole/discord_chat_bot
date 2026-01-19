import express from "express";
import helloRoute from "./routes/helloRoute.js";

const app = express();
const PORT = 3000;

app.use("/hello", helloRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
