import  { Request,Response } from 'express'
import { greatApeNFTInstance } from '../config/web3-connection'
import uploadIPFS from '../moralis-services/uploadIPFS'

/**
 * Takes a name a description and a image to upload to ipfs and then mint the NFT
 * @param req Request
 * @param res Reponse
 */
const mint = async (req:Request,res:Response)=>{
    console.log("Caiu")
    const to = req.params.wallet
    const file = req.file
    const {name,description} = req.body
    if(!file || !name || !description || !to){
        return res.sendStatus(422)
    }
    const buffer = file?.buffer
    const fileName= file?.originalname
    const base64EncodedBuffer = buffer!.toString("base64") 
    let imageUrl:string
    try {
         imageUrl = await uploadIPFS(base64EncodedBuffer,fileName!) 
    } catch (error) {
        console.error(error)
        return res.send(500).json({
            success:false,
            message:"Moralis could not upload to ipfs"
        })
    }

    try {
        const metadata = {
            name:name,
            description:description,
            image:imageUrl
        }
        const response = await greatApeNFTInstance.safeMint(to,JSON.stringify(metadata))
        console.log(response.hash)
        return res.status(200).json({
            success:true,
            transactionHash:response.hash
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Could not mint"
        })
    }
}

export {
    mint
}