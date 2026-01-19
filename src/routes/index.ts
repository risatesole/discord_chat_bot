import { Router } from "express";
import helloRoute from "./Hello/HelloRoute.js"; 

const router = Router();

router.use("/hello", helloRoute);

export default router;
