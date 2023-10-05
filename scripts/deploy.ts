import { ethers } from "hardhat";
import {saveDeployment} from "deployment-history"
async function main() {
  const network = await ethers.provider.getNetwork()
  const [firstAccount,owner] = await ethers.getSigners()
  console.log("Deploying...")
  const GreatApeNFTFactory= await ethers.getContractFactory("GreatApeNFT")
  const greatApeNFT = await GreatApeNFTFactory.deploy()
  const address = await greatApeNFT.getAddress()
  console.log(`Deployed at ${address}`)
  saveDeployment(address,network.name)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
