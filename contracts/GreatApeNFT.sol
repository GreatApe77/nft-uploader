// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract GreatApeNFT is  ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Great Ape NFT", "GNFT") {}

    function safeMint(address to, string calldata jsonStringMetadatari) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, jsonStringMetadatari);
    }

    
    function buildOnChainURI(string calldata jsonStringMetadata) internal pure returns (string memory){
        return string.concat("data:application/json;base64,",Base64.encode(bytes(jsonStringMetadata)));
    }

  
}