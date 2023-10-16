// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
/**
 * @title Great Ape NFT
 * @author Mateus
 * @notice Contrato que minta NFTS
 */
contract GreatApeNFT is  ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Great Ape NFT", "GNFT") {}

    /**
     * Minta um nft para um endereço 
     * @param to endereco do que vai receber o NFT
     * @param jsonStringMetadatari os metadados do nft que vem no formato JSON.stringyfied do backend
     */
    function safeMint(address to, string calldata jsonStringMetadatari) external onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, buildOnChainURI(jsonStringMetadatari));
    }

    
    /**
     * Encodifica o string em json para uma URI on chain
     * @param jsonStringMetadata os metadados do nft que vem no formato JSON.stringyfied do backend
     * @return string Retorna a string base concatenado com o Base64 do JSON
     */
    function buildOnChainURI(string calldata jsonStringMetadata) internal pure returns (string memory){
        return string.concat("data:application/json;base64,",Base64.encode(bytes(jsonStringMetadata)));
    }

    /**
     * @return Retorna a quantidade de tokens mintados no contrato
     */
    function totalSupply() public view returns(uint256){
        return _tokenIdCounter.current();
    }
  
}