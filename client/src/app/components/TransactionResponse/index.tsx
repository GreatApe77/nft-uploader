import { TransactionResponse } from "@/app/api-calls/postForm";

export default function TransactionResponse({responseData}:TransactionResponse) {
  return (
    <div>
        <h1>Acompanhe sua transação no link abaixo</h1>
        <a href={`https://testnet.ftmscan.com/tx/${responseData.transactionHash}`}>CLIQUE AQUI</a>
    </div>
  )
}
