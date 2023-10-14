import { User } from "firebase/auth"

export type FormDataNFT={
    name:string,
    description:string
    image:File
}
export type TransactionResponse={
    status:Number
    responseData:{
        data:{
            transactionHash:string

        }
    }
}
export async function postForm(formData:FormDataNFT,wallet:string,user:User| undefined){
    const bodyFormData= new FormData()
    bodyFormData.append("name",formData.name)
    bodyFormData.append("description",formData.description)
    bodyFormData.append("file",formData.image)
    let accessToken:string | undefined
    try {
         accessToken = await user?.getIdToken()
    } catch (error) {
        throw new Error("Could not get jwt token")
    }

    try {
        
        const res = await fetch(`/api/mint/${wallet}`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`
            },
            body:bodyFormData
        })
        const responseData = await res.json()
        return {
            status:responseData.status,
            responseData:responseData.data}as TransactionResponse
    } catch (error) {
        throw new Error("Error in in posting form")
    }
}