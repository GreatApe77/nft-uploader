import type { Metadata } from "next";
import Header from "./components/Header";
import { ThirdwebProvider } from "./ThirdWebProviderComponent";
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
			<head>
				<link rel="shortcut icon" href="/great-ape-psn.png" type="image/x-icon" />
				
			</head>
			<body>
				<Header avatarUrl="awd" isAuth key={"qwfwef"}/>
				<ThirdwebProvider >

				<div>{children}</div>
				</ThirdwebProvider>
			</body>
		</html>
	);
}
