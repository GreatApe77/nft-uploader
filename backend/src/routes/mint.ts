import express from "express";
import multer from 'multer';
import { mint } from "../controllers/mint";
import { validateToken } from "../middleware/firebase-auth";

const router = express.Router()
const upload = multer()
router.use(validateToken)
router.post("/mint/:address",upload.single("file"),mint)

export  {
    router
}