"use client";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export default function Header() {
	const account = useAddress();
	return (
		<header className="py-3 mb-3 border-bottom">
			<div
				className="container-fluid d-grid gap-3 align-items-center"
				style={{ gridTemplateColumns: "1fr 2fr" }}
			>
				<div className="dropdown">
					<a
						href="#"
						className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							className=""
							width={"120"}
							src="/great-ape-psn.png"
							alt="logo"
						/>
						<h1>Criador de NFTs</h1>
					</a>
				</div>

				<div className="d-flex align-items-center">
					<div className="w-100 me-3" role="search">
						<nav className="nav justify-content-end  ">
							<Link className=" btn btn-primary" href="/">
								Home
							</Link>
							{account ? (
								<>
									<Link className="nav-link" href="/my-nfts">
										Seus NFTS
									</Link>
								</>
							) : (
								<></>
							)}
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
