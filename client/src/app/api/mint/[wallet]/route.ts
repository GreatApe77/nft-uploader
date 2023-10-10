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
	const res = await fetch(`${endpoint!}/mint/${wallet}`, {
		method: "POST",
		body: formData,
	});
	const jsonRes = await res.json();
	return NextResponse.json({
		status: res.status,
		data: jsonRes,
	});
	
}
