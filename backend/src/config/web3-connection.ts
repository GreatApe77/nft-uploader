import dotenv from "dotenv";
import { ethers } from "ethers";
import { ABI } from "./contract-data";
dotenv.config()
const networkConfig = {
	goerli: {
		id: 5,
		rpcUrl: process.env.GOERLI_RPC || "https://rpc.ankr.com/eth_goerli",
	},
	fantomTestnet: {
		id: 4002,
		rpcUrl:
			process.env.FANTOM_TESTNET_RPC || "https://rpc.testnet.fantom.network/",
	},
	ganacheGUI: {
		id: 5777,
		rpcUrl: process.env.GANACHE_GUI_RPC || "http://127.0.0.1:7545",
	},
	polygonMumbaiTestnet: {
		rpcUrl:
			process.env.POLYGON_MUMBAI_TESTNET_RPC ||
			"https://endpoints.omniatech.io/v1/matic/mumbai/public",
		id: 80001,
	},
	polygonMainnet: {
		rpcUrl: process.env.POLYGON_MAINNET_RPC || "https://polygon-rpc.com/",
		id: 137,
	},
};
//const parameter = process.argv[2] || "fantomTestnet"
const selectedNetwork = networkConfig.fantomTestnet //networkConfig[parameter]  //rede padrao
const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`;
const ADMIN_WALLET = process.env.ADMIN_WALLET;
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const GREAT_APE_NFT_CONTRACT_ADDRESS= `${process.env.GREAT_APE_NFT_CONTRACT_ADDRESS}`;
const provider = new ethers.JsonRpcProvider(selectedNetwork.rpcUrl)
const wallet = new ethers.Wallet(PRIVATE_KEY,provider)

const greatApeNFTInstance = new ethers.Contract(GREAT_APE_NFT_CONTRACT_ADDRESS,ABI,wallet)
const PORT = process.env.PORT ||8080
export {
    greatApeNFTInstance,
    PORT,
    MORALIS_API_KEY,
    
}