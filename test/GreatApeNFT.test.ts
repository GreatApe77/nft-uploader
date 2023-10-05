import { ethers } from "hardhat";
import { expect } from "chai";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers"
type SampleURI={
    name:string,
    description:string,
    image:string
}
describe("GreatApeNFT", () => {
    const sampleURI:SampleURI= {
        name:"Sample URI NAME",
        description:"Sample Description que contém caracteres não muito éspeciais ",
        image:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b5ce17cf-1d42-46e1-a3cb-ec9ce5b61aca/dc8flxn-de514494-345c-4613-bd70-998f97457fc1.png"
    }
    async function deployFixture(){
        const [owner,otherAccount,thirdAccount] = await ethers.getSigners()
        const GreatApeNFTFactory = await ethers.getContractFactory("GreatApeNFT")
        const greatApeNFT = await GreatApeNFTFactory.deploy()
        return {greatApeNFT,owner,otherAccount,thirdAccount}
    }
    async function deployWithTokenMinted(){
        
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployFixture)
        
        await greatApeNFT.safeMint(owner,JSON.stringify(sampleURI))
        return {greatApeNFT,owner,otherAccount,thirdAccount}
    }
    it("Deve mintar um nft para um endereço e checar seu saldo",async ()=>{
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployFixture)
       
        
        await greatApeNFT.safeMint(owner,JSON.stringify(sampleURI))
        const balance = await greatApeNFT.balanceOf(owner.address)
        expect(balance.toString()==="1")
    })
    it("Deve retornar uma URI em base 64 que é convertida para json na funcao tokenURI",async ()=>{
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployWithTokenMinted)
        const retrievedURI = await greatApeNFT.tokenURI(1)
        const onlyBase64 = retrievedURI.split(",")[1]
        const stringifyedJson = Buffer.from(onlyBase64,"base64").toString()
        expect(stringifyedJson===JSON.stringify(sampleURI))
    })
    it("Deve retornar o total de tokens mintados",async ()=>{
        const {greatApeNFT,owner,otherAccount,thirdAccount} = await loadFixture(deployFixture)
        await greatApeNFT.safeMint(otherAccount.address,JSON.stringify(sampleURI))
        await greatApeNFT.safeMint(otherAccount.address,JSON.stringify(sampleURI))
        await greatApeNFT.safeMint(otherAccount.address,JSON.stringify(sampleURI))
        await greatApeNFT.safeMint(otherAccount.address,JSON.stringify(sampleURI))
        //4 mints
        const totalSupply = await greatApeNFT.totalSupply()
        
        expect(totalSupply.toString()==="4")
    })
});
