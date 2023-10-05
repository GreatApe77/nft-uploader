
import morgan from "morgan"
import express from 'express'
import {router as mintRouter} from './routes/mint'
import "./config/moralis-connect"
import { PORT } from "./config/web3-connection"



const app = express()
app.use(morgan("tiny"))


app.use(mintRouter)


app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`)
})