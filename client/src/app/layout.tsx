import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "NFT Uploader",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen flex-col flex">
					<Header />
					{children}
					<div>
						<h1>FOOTER</h1>
					</div>
				</div>
			</body>
		</html>
	);
}
