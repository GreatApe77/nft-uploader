
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
export async function postForm(formData:FormDataNFT,wallet:string){
    const bodyFormData= new FormData()
    bodyFormData.append("name",formData.name)
    bodyFormData.append("description",formData.description)
    bodyFormData.append("file",formData.image)

    try {
        
        const res = await fetch(`/api/mint/${wallet}`,{
            method:"POST",
            body:bodyFormData
        })
        const status = res.status
        const responseData = await res.json()
        return {status,responseData}as TransactionResponse
    } catch (error) {
        throw new Error("Error in in posting form")
    }
}