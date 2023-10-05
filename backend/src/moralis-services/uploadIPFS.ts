
//const Moralis = require("moralis").default;
import Moralis from "moralis"


async function uploadIPFS(base64EncodedPhoto:string,name:string){

    const uploadArray = [
        {
            path:name,
            content: base64EncodedPhoto
        }
    ]
    try {
        
        const response = await Moralis.EvmApi.ipfs.uploadFolder({
            abi:uploadArray
        })
        return response.result[0].path
    } catch (error) {
        throw new Error(String(error))
    }
    
}

export default uploadIPFS