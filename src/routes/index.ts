import { Router } from "express";
import Greeting from "./Greeting/GreetingRoute.js"; 
import discordRoute from "./Discord/DiscordRoute.js"

const router = Router();

router.use("/greeting", Greeting);
router.use("/discord",discordRoute);

export default router;
