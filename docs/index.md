# Solidity API

## GreatApeNFT

Contrato que minta NFTS

### constructor

```solidity
constructor() public
```

### safeMint

```solidity
function safeMint(address to, string jsonStringMetadatari) external
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | endereco do que vai receber o NFT |
| jsonStringMetadatari | string | os metadados do nft que vem no formato JSON.stringyfied do backend |

### buildOnChainURI

```solidity
function buildOnChainURI(string jsonStringMetadata) internal pure returns (string)
```

Encodifica o string em json para uma URI on chain

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| jsonStringMetadata | string | os metadados do nft que vem no formato JSON.stringyfied do backend |

### totalSupply

```solidity
function totalSupply() public view returns (uint256)
```

Retorna a quantidade de tokens mintados no contrato

