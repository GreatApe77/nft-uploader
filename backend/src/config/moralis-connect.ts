import Moralis from "moralis"
import dotenv from "dotenv"
dotenv.config()
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

async function connectMoralis(){
    await Moralis.start({
        apiKey:MORALIS_API_KEY
    })

}

connectMoralis().then(()=>{
    console.log("Connected to moralis")
}).catch(error=>console.error(error))