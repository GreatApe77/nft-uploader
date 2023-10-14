import { TransactionResponse } from "@/app/api-calls/postForm";

export default function TransactionResponse({
	responseData,
}: TransactionResponse) {
	return (
		<div>
			<h2>Acompanhe sua transação no link abaixo</h2>
			<a
				href={`https://testnet.ftmscan.com/tx/${responseData.data.transactionHash}`}
			target="_blank"

      >
				<h4>ClIQUE AQUI</h4>
			</a>
		</div>
	);
}
