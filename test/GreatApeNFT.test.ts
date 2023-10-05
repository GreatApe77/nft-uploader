import { ethers } from "hardhat";
import { expect } from "chai";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers"
type SampleURI={
    name:string,
    description:string,
    image:string
}
describe("GreatApeNFT", () => {

    async function deployFixture(){
        const [owner,otherAccount,thirdAccount] = await ethers.getSigners()
        const GreatApeNFTFactory = await ethers.getContractFactory("GreatApeNFT")
        const greatApeNFT = await GreatApeNFTFactory.deploy()
        return {greatApeNFT,owner,otherAccount,thirdAccount}
    }
    async function deployWithTokenMinted(){
        
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployFixture)
        const sampleURI:SampleURI= {
            name:"Sample URI NAME",
            description:"Sample Description",
            image:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b5ce17cf-1d42-46e1-a3cb-ec9ce5b61aca/dc8flxn-de514494-345c-4613-bd70-998f97457fc1.png"
        }
        
        await greatApeNFT.safeMint(owner,JSON.stringify(sampleURI))
        return {greatApeNFT,owner,otherAccount,thirdAccount}
    }
    it("Should mint a Token to an Address",async ()=>{
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployFixture)
        const sampleURI:SampleURI= {
            name:"Sample URI NAME",
            description:"Sample Description",
            image:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b5ce17cf-1d42-46e1-a3cb-ec9ce5b61aca/dc8flxn-de514494-345c-4613-bd70-998f97457fc1.png"
        }
        
        await greatApeNFT.safeMint(owner,JSON.stringify(sampleURI))
        const balance = await greatApeNFT.balanceOf(owner.address)
        expect(balance.toString()==="1")
    })
});
