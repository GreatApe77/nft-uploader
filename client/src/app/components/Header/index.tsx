import React from "react";
import Link from "next/link";
export default function Header() {
	return (
		<header className="flex justify-between items-center bg-gray-900 p-4 flex-wrap max-md:flex-col ">
			<img className="w-28 " src="/great-ape-psn.png" alt="" />

      <div className="w-96 flex gap-6 justify-between max-md:justify-center w-44 ">
					<Link className="text-lg text-white hover:text-teal-400" href={"/nfts"}>Home</Link>
          <Link className="text-lg text-white hover:text-teal-400"  href={"/nfts"}>View NFTS</Link>

					<Link className="text-lg text-white hover:text-teal-400"  href={"/nfts"}>Check Collection</Link>
      </div>

			<div >


				
				<button className="bg-slate-300">Connect Wallet</button>
			</div>
		</header>
	);
}
