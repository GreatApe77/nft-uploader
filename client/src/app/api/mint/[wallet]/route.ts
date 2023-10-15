
import { NextResponse } from "next/server";
import fetch from "node-fetch";

 
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
          headers: Object.fromEntries(request.headers), 
           httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//
        };

        //`${endpoint!}/mint/${wallet}`
        const axiosResponse = await axios.post(`${endpoint!}/mint/${wallet}`,formData,axiosConfig);
        //request.headers.set("Content-Length", formData.length);
        console.log(endpoint!)
        const res = await fetch(`${endpoint!}/mint/${wallet}`,{
            method:"POST",
            headers:request.headers,
            body:request.body as any
        })
        const jsonRes = await res.json()
        return NextResponse.json({
            status: res.status,
            data: jsonRes,
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success:false,
            message:"Servidor de origem nao respondeu"
        })    
    }
	
	
	
}
