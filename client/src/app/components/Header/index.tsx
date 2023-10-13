import React from "react";
import Link from "next/link";
export type HeaderProps ={
	isAuth:boolean,
	avatarUrl:string
}
export default function Header({isAuth,avatarUrl}:HeaderProps) {
	return (
		<header className="flex justify-between items-center bg-gray-900 p-4 flex-wrap max-md:flex-col ">
			<img className="w-28 " src="/great-ape-psn.png" alt="" />

			<div className="w-96 flex gap-6 justify-between max-md:justify-center-w-44 ">
				<Link className="text-lg text-white hover:text-teal-400" href={"/nfts"}>
					Home
				</Link>
				<Link  className="text-lg text-white hover:text-teal-400" target="_blank" href={"https://testnet.ftmscan.com/token/0xa92bbBfdc70f3F66376f3F57743423c078dD0307"}>
					View NFTS
				</Link>

				<Link className="text-lg text-white hover:text-teal-400" href={"/nfts"}>
					Check Collection
				</Link>
			</div>

			<div>
				{true?(<>
				<img src={avatarUrl} alt="Avatar url" className="rounded-full w-20" />
				</>):(<>
				<button className="text-green-400 text-2xl p-2 rounded  border-2 border-green-400 hover:bg-green-400 hover:text-gray-900 transition-all">Log in With Google</button>
				</>)}
			</div>
		</header>
	);
}
