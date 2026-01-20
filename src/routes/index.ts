import { Router } from "express";
import helloRoute from "./Hello/HelloRoute.js"; 
import discordRoute from "./Discord/DiscordRoute.js"

const router = Router();

router.use("/hello", helloRoute);
router.use("/discord",discordRoute);

export default router;
