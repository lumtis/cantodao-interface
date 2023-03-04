/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Turnstile, TurnstileInterface } from "../Turnstile";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
    ],
    name: "DistributeFees",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "smartContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Register",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "contractTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "distributeFees",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526000600c553480156200001657600080fd5b506040805180820182526009808252685475726e7374696c6560b81b602080840182905284518086019095529184529083015290600062000058838262000115565b50600162000067828262000115565b505050620001e1565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200009b57607f821691505b602082108103620000bc57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200011057600081815260208120601f850160051c81016020861015620000eb5750805b601f850160051c820191505b818110156200010c57828155600101620000f7565b5050505b505050565b81516001600160401b0381111562000131576200013162000070565b620001498162000142845462000086565b84620000c2565b602080601f831160018114620001815760008415620001685750858301515b600019600386901b1c1916600185901b1785556200010c565b600085815260208120601f198616915b82811015620001b25788860151825594840194600190910190840162000191565b5085821015620001d15787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611cda80620001f16000396000f3fe60806040526004361061012a5760003560e01c80634f6ccce7116100ab57806395d89b411161006f57806395d89b411461034c578063a22cb46514610361578063b88d4fde14610381578063c87b56dd146103a1578063e63697c8146103c1578063e985e9c5146103e157600080fd5b80634f6ccce7146102ac5780636029bf9f146102cc5780636352211e146102df57806370a08231146102ff5780638cf874d31461031f57600080fd5b806323b872dd116100f257806323b872dd146101ff5780632f745c591461021f57806342842e0e1461023f5780634420e4861461025f5780634903b0d11461027f57600080fd5b806301ffc9a71461012f57806306fdde0314610164578063081812fc14610186578063095ea7b3146101be57806318160ddd146101e0575b600080fd5b34801561013b57600080fd5b5061014f61014a3660046117bb565b61042a565b60405190151581526020015b60405180910390f35b34801561017057600080fd5b50610179610455565b60405161015b9190611828565b34801561019257600080fd5b506101a66101a136600461183b565b6104e7565b6040516001600160a01b03909116815260200161015b565b3480156101ca57600080fd5b506101de6101d9366004611869565b61050e565b005b3480156101ec57600080fd5b506008545b60405190815260200161015b565b34801561020b57600080fd5b506101de61021a366004611895565b610628565b34801561022b57600080fd5b506101f161023a366004611869565b610659565b34801561024b57600080fd5b506101de61025a366004611895565b6106ef565b34801561026b57600080fd5b506101f161027a3660046118d6565b61070a565b34801561028b57600080fd5b506101f161029a36600461183b565b600b6020526000908152604090205481565b3480156102b857600080fd5b506101f16102c736600461183b565b61079a565b6101de6102da36600461183b565b61082d565b3480156102eb57600080fd5b506101a66102fa36600461183b565b61088b565b34801561030b57600080fd5b506101f161031a3660046118d6565b6108eb565b34801561032b57600080fd5b506101f161033a3660046118d6565b600a6020526000908152604090205481565b34801561035857600080fd5b50610179610971565b34801561036d57600080fd5b506101de61037c3660046118f3565b610980565b34801561038d57600080fd5b506101de61039c366004611947565b61098f565b3480156103ad57600080fd5b506101796103bc36600461183b565b6109c7565b3480156103cd57600080fd5b506101f16103dc366004611a27565b610a3b565b3480156103ed57600080fd5b5061014f6103fc366004611a4e565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b0319821663780e9d6360e01b148061044f575061044f82610b1e565b92915050565b60606000805461046490611a7c565b80601f016020809104026020016040519081016040528092919081815260200182805461049090611a7c565b80156104dd5780601f106104b2576101008083540402835291602001916104dd565b820191906000526020600020905b8154815290600101906020018083116104c057829003601f168201915b5050505050905090565b60006104f282610b6e565b506000908152600460205260409020546001600160a01b031690565b60006105198261088b565b9050806001600160a01b0316836001600160a01b03160361058b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806105a757506105a781336103fc565b6106195760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610582565b6106238383610bd0565b505050565b6106323382610c3e565b61064e5760405162461bcd60e51b815260040161058290611ab6565b610623838383610cbd565b6000610664836108eb565b82106106c65760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610582565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b6106238383836040518060200160405280600081525061098f565b600c54600090339061071c8482610e2e565b600c805490600061072c83611b19565b90915550506001600160a01b038281166000818152600a60209081526040918290208590558151928352928716928201929092529081018290527fcc0bec1447060c88cdc5a739cf29cfa26c453574dd3f5b9e4dcc317d6401cb1c9060600160405180910390a19392505050565b60006107a560085490565b82106108085760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610582565b6008828154811061081b5761081b611b32565b90600052602060002001549050919050565b6000818152600b60205260408120805434929061084b908490611b48565b9091555050604080518281523460208201527f916ad8171ef8c567c7790377a142f0200f9565940680c06e30dd105cfd924968910160405180910390a150565b6000818152600260205260408120546001600160a01b03168061044f5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610582565b60006001600160a01b0382166109555760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610582565b506001600160a01b031660009081526003602052604090205490565b60606001805461046490611a7c565b61098b338383610fc7565b5050565b6109993383610c3e565b6109b55760405162461bcd60e51b815260040161058290611ab6565b6109c184848484611095565b50505050565b60606109d282610b6e565b60006109e960408051602081019091526000815290565b90506000815111610a095760405180602001604052806000815250610a34565b80610a13846110c8565b604051602001610a24929190611b5b565b6040516020818303038152906040525b9392505050565b6000838152600b602052604081205480610a975760405162461bcd60e51b815260206004820152601e60248201527f5475726e7374696c653a204e6f206665657320746f20776974686472617700006044820152606401610582565b80831115610aa3578092505b610aad8382611b8a565b6000868152600b60209081526040918290209290925580518781526001600160a01b0387169281019290925281018490527f9da6493a92039daf47d1f2d7a782299c5994c6323eb1e972f69c432089ec52bf9060600160405180910390a1610b15848461115b565b50909392505050565b60006001600160e01b031982166380ac58cd60e01b1480610b4f57506001600160e01b03198216635b5e139f60e01b145b8061044f57506301ffc9a760e01b6001600160e01b031983161461044f565b6000818152600260205260409020546001600160a01b0316610bcd5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610582565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610c058261088b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610c4a8361088b565b9050806001600160a01b0316846001600160a01b03161480610c9157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610cb55750836001600160a01b0316610caa846104e7565b6001600160a01b0316145b949350505050565b826001600160a01b0316610cd08261088b565b6001600160a01b031614610cf65760405162461bcd60e51b815260040161058290611b9d565b6001600160a01b038216610d585760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610582565b610d658383836001611274565b826001600160a01b0316610d788261088b565b6001600160a01b031614610d9e5760405162461bcd60e51b815260040161058290611b9d565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610e845760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610582565b6000818152600260205260409020546001600160a01b031615610ee95760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610582565b610ef7600083836001611274565b6000818152600260205260409020546001600160a01b031615610f5c5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610582565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b816001600160a01b0316836001600160a01b0316036110285760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610582565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6110a0848484610cbd565b6110ac848484846113b4565b6109c15760405162461bcd60e51b815260040161058290611be2565b606060006110d5836114b5565b600101905060008167ffffffffffffffff8111156110f5576110f5611931565b6040519080825280601f01601f19166020018201604052801561111f576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461112957509392505050565b804710156111ab5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e63650000006044820152606401610582565b6000826001600160a01b03168260405160006040518083038185875af1925050503d80600081146111f8576040519150601f19603f3d011682016040523d82523d6000602084013e6111fd565b606091505b50509050806106235760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d617920686176652072657665727465640000000000006064820152608401610582565b6112808484848461158d565b60018111156112ef5760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b6064820152608401610582565b816001600160a01b03851661134b5761134681600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b61136e565b836001600160a01b0316856001600160a01b03161461136e5761136e8582611615565b6001600160a01b03841661138a57611385816116b2565b6113ad565b846001600160a01b0316846001600160a01b0316146113ad576113ad8482611761565b5050505050565b60006001600160a01b0384163b156114aa57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906113f8903390899088908890600401611c34565b6020604051808303816000875af1925050508015611433575060408051601f3d908101601f1916820190925261143091810190611c71565b60015b611490573d808015611461576040519150601f19603f3d011682016040523d82523d6000602084013e611466565b606091505b5080516000036114885760405162461bcd60e51b815260040161058290611be2565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610cb5565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106114f45772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611520576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061153e57662386f26fc10000830492506010015b6305f5e1008310611556576305f5e100830492506008015b612710831061156a57612710830492506004015b6064831061157c576064830492506002015b600a831061044f5760010192915050565b60018111156109c1576001600160a01b038416156115d3576001600160a01b038416600090815260036020526040812080548392906115cd908490611b8a565b90915550505b6001600160a01b038316156109c1576001600160a01b0383166000908152600360205260408120805483929061160a908490611b48565b909155505050505050565b60006001611622846108eb565b61162c9190611b8a565b60008381526007602052604090205490915080821461167f576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906116c490600190611b8a565b600083815260096020526040812054600880549394509092849081106116ec576116ec611b32565b90600052602060002001549050806008838154811061170d5761170d611b32565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061174557611745611c8e565b6001900381819060005260206000200160009055905550505050565b600061176c836108eb565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160e01b031981168114610bcd57600080fd5b6000602082840312156117cd57600080fd5b8135610a34816117a5565b60005b838110156117f35781810151838201526020016117db565b50506000910152565b600081518084526118148160208601602086016117d8565b601f01601f19169290920160200192915050565b602081526000610a3460208301846117fc565b60006020828403121561184d57600080fd5b5035919050565b6001600160a01b0381168114610bcd57600080fd5b6000806040838503121561187c57600080fd5b823561188781611854565b946020939093013593505050565b6000806000606084860312156118aa57600080fd5b83356118b581611854565b925060208401356118c581611854565b929592945050506040919091013590565b6000602082840312156118e857600080fd5b8135610a3481611854565b6000806040838503121561190657600080fd5b823561191181611854565b91506020830135801515811461192657600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561195d57600080fd5b843561196881611854565b9350602085013561197881611854565b925060408501359150606085013567ffffffffffffffff8082111561199c57600080fd5b818701915087601f8301126119b057600080fd5b8135818111156119c2576119c2611931565b604051601f8201601f19908116603f011681019083821181831017156119ea576119ea611931565b816040528281528a6020848701011115611a0357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080600060608486031215611a3c57600080fd5b8335925060208401356118c581611854565b60008060408385031215611a6157600080fd5b8235611a6c81611854565b9150602083013561192681611854565b600181811c90821680611a9057607f821691505b602082108103611ab057634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600060018201611b2b57611b2b611b03565b5060010190565b634e487b7160e01b600052603260045260246000fd5b8082018082111561044f5761044f611b03565b60008351611b6d8184602088016117d8565b835190830190611b818183602088016117d8565b01949350505050565b8181038181111561044f5761044f611b03565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611c67908301846117fc565b9695505050505050565b600060208284031215611c8357600080fd5b8151610a34816117a5565b634e487b7160e01b600052603160045260246000fdfea264697066735822122012edcb95e1b014079cde3ca13f36367c718750e7872fff3a1f4854d8ce70f2c364736f6c63430008110033";

type TurnstileConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TurnstileConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Turnstile__factory extends ContractFactory {
  constructor(...args: TurnstileConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Turnstile> {
    return super.deploy(overrides || {}) as Promise<Turnstile>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Turnstile {
    return super.attach(address) as Turnstile;
  }
  override connect(signer: Signer): Turnstile__factory {
    return super.connect(signer) as Turnstile__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TurnstileInterface {
    return new utils.Interface(_abi) as TurnstileInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Turnstile {
    return new Contract(address, _abi, signerOrProvider) as Turnstile;
  }
}
