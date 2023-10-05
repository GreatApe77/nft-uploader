import express from "express";
import multer from 'multer';
import { mint } from "../controllers/mint";

const router = express.Router()
const upload = multer()

router.post("/mint/:address",upload.single("file"),mint)

export  {
    router
}