import { admin } from "../config/firebase-config";
import { Request,Response,NextFunction } from "express";
 async function validateToken(req:Request,res:Response,next:NextFunction){
    console.log(req.body)
    const token = `${req.headers.authorization?.split(" ")[1]}`
    //console.log(token)
    try {
        const decodeValue = await  admin.auth().verifyIdToken(token)
        if(decodeValue){
            console.log(decodeValue)
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

export {
    validateToken
}