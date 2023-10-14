import { admin } from "../config/firebase-config";
import { Request,Response,NextFunction } from "express";
export async function validateToken(req:Request,res:Response,next:NextFunction){

    const token = `${req.headers.authorization?.split(" ")[1]}`
    console.log(token)
    try {
        const decodeValue = await  admin.auth().verifyIdToken(token)
        if(decodeValue){
            return next()
        }
        return res.status(401).json({
            success:false,
            message:"Not authenticated.Please authenticate first"
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Error in validating token"
        })
    }   

}