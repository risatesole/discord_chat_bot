import express from "express";
import routes from "./routes/index.js";
import { registerCommands } from "./discord/registerCommands.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  if (process.env.REGISTER_COMMANDS === "true") {
    try {
      await registerCommands();
    } catch (err) {
      console.error("Command registration failed:", err);
    }
  }

  app.use("/api", routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
