import express from "express";
import { setAddr } from "../controllers/chainController.js";

const router = express.Router();

router.post("/set-address", setAddr);

export default router;