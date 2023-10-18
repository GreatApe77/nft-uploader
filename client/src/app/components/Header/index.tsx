import React from "react";


export default function Header() {
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
					</a>
					<ul className="dropdown-menu text-small shadow">
						<li>
							<a className="dropdown-item active" href="#" aria-current="page">
								Overview
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Inventory
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Customers
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Products
							</a>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Reports
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="#">
								Analytics
							</a>
						</li>
					</ul>
				</div>

				<div className="d-flex align-items-center">
					<div className="w-100 me-3" role="search">
						
					</div>

					<div className="flex-grow-0 dropdown">
						<a
							href="#"
							className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src="/great-ape-psn.png"
								alt="mdo"
								width="32"
								height="32"
								className="rounded-circle"
							/>
						</a>
						<ul className="dropdown-menu text-small shadow">
							<li>
								<a className="dropdown-item" href="#">
									New project...
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Settings
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Profile
								</a>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Sign out
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
