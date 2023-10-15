import axios,{AxiosRequestConfig} from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
	const wallet = context.params.wallet;
	console.log("CHAMOU")
    console.log(request.body)
    let endpoint:string
    if(process.env.ENVIROMENT==="dev"){
        endpoint = `${process.env.DEV_BACKEND_ENDPOINT}`
    }else if (process.env.ENVIROMENT==="prod"){
        endpoint = `${process.env.PROD_BACKEND_ENDPOINT}`
    }
    console.log(endpoint!)
    const formData = await request.formData()
    console.log(formData)
    try {
        const axiosConfig: AxiosRequestConfig = {
            headers: Object.fromEntries(request.headers), // Convert Headers to an object
        };

        //`${endpoint!}/mint/${wallet}`
        const axiosResponse = await axios.post(`${endpoint!}/mint/${wallet}`,formData,axiosConfig);

        return NextResponse.json({
            status: axiosResponse.status,
            data: axiosResponse.data,
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success:false,
            message:"Servidor de origem nao respondeu"
        })    
    }
	
	
	
}