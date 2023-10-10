import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
	const wallet = context.params.wallet;
	const formData = await request.formData();
    let endpoint:string
    if(process.env.NODE_ENV==="development"){
        endpoint = `${process.env.DEV_BACKEND_ENDPOINT}`
    }else if (process.env.NODE_ENV==="production"){
        endpoint = `${process.env.PROD_BACKEND_ENDPOINT}`
    }
    try {
        const res = await fetch(`${endpoint!}/mint/${wallet}`, {
            method: "POST",
            body: formData,
        });
        const jsonRes = await res.json();
        return NextResponse.json({
            status: res.status,
            data: jsonRes,})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Servidor de origem nao respondeu"
        })    
    }
	
	
	
}
