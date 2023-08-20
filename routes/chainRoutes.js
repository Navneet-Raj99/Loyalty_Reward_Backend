import express from "express";
import { setAddr } from "../controllers/chainController";

router.get("/set-address", setAddr);

const router = express.Router();