import express from "express";
import { getNftByWallet, getNftByWalletEXP, setAddr } from "../controllers/chainController.js";
import { getNFTDataByWalletExp } from "../helpers/contractHelper.js";

const router = express.Router();

router.post("/set-address", setAddr);
router.post("/getnftbywallet",getNftByWallet)
router.post("/getnftbywalletEXP",getNftByWalletEXP)

export default router;