/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { DAOProposer, DAOProposerInterface } from "../DAOProposer";

const _abi = [
  {
    inputs: [],
    name: "daoGovernor",
    outputs: [
      {
        internalType: "contract IProposalReceiver",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getProposalContent",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
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
        name: "id",
        type: "uint256",
      },
    ],
    name: "getProposalCreator",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalContents",
    outputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalCount",
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
    name: "proposalCreator",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalIDs",
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
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "propose",
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
        internalType: "contract IProposalReceiver",
        name: "_governor",
        type: "address",
      },
    ],
    name: "setGovernor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600060015534801561001557600080fd5b50610e5a806100256000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063a007b19711610066578063a007b19714610130578063ac78961b14610150578063c42cf53514610179578063da35c6641461018e578063ff05d7fd1461019757600080fd5b80631de20bcf1461009857806330f9aac4146100c45780634ed27034146100ef5780637d5e81e21461010f575b600080fd5b6100ab6100a6366004610801565b6101c0565b6040516100bb94939291906108b5565b60405180910390f35b6000546100d7906001600160a01b031681565b6040516001600160a01b0390911681526020016100bb565b6101026100fd366004610801565b6103fe565b6040516100bb9190610961565b61012261011d366004610b73565b6104a0565b6040519081526020016100bb565b61012261013e366004610801565b60026020526000908152604090205481565b6100d761015e366004610801565b6004602052600090815260409020546001600160a01b031681565b61018c610187366004610c7e565b6105fb565b005b61012260015481565b6100d76101a5366004610801565b6000908152600460205260409020546001600160a01b031690565b600081815260036020818152604092839020805484518184028101840190955280855260609485948594859493600185019360028601938601929091869183018282801561023757602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610219575b505050505093508280548060200260200160405190810160405280929190818152602001828054801561028957602002820191906000526020600020905b815481526020019060010190808311610275575b5050505050925081805480602002602001604051908101604052809291908181526020016000905b8282101561035d5783829060005260206000200180546102d090610c9b565b80601f01602080910402602001604051908101604052809291908181526020018280546102fc90610c9b565b80156103495780601f1061031e57610100808354040283529160200191610349565b820191906000526020600020905b81548152906001019060200180831161032c57829003601f168201915b5050505050815260200190600101906102b1565b50505050915080805461036f90610c9b565b80601f016020809104026020016040519081016040528092919081815260200182805461039b90610c9b565b80156103e85780601f106103bd576101008083540402835291602001916103e8565b820191906000526020600020905b8154815290600101906020018083116103cb57829003601f168201915b5050505050905093509350935093509193509193565b6003602081905260009182526040909120908101805461041d90610c9b565b80601f016020809104026020016040519081016040528092919081815260200182805461044990610c9b565b80156104965780601f1061046b57610100808354040283529160200191610496565b820191906000526020600020905b81548152906001019060200180831161047957829003601f168201915b5050505050905081565b60008054604051633eaf40f160e11b815282916001600160a01b031690637d5e81e2906104d79089908990899089906004016108b5565b6020604051808303816000875af11580156104f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051a9190610cd5565b600154600090815260026020908152604080832084905580516080810182528a81528083018a90528082018990526060810188905284845260038352922082518051949550929390926105719284929101906106a0565b50602082810151805161058a9260018501920190610705565b50604082015180516105a6916002840191602090910190610740565b50606082015160038201906105bb9082610d3d565b505060018054915060006105ce83610dfd565b9091555050600081815260046020526040902080546001600160a01b031916331790559050949350505050565b6000546001600160a01b03161561067e5760405162461bcd60e51b815260206004820152603860248201527f44414f50726f706f7365723a2044414f20676f7665726e6f722061646472657360448201527f7320697320616c726561647920696e697469616c697a65640000000000000000606482015260840160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b8280548282559060005260206000209081019282156106f5579160200282015b828111156106f557825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906106c0565b50610701929150610792565b5090565b8280548282559060005260206000209081019282156106f5579160200282015b828111156106f5578251825591602001919060010190610725565b828054828255906000526020600020908101928215610786579160200282015b8281111561078657825182906107769082610d3d565b5091602001919060010190610760565b506107019291506107a7565b5b808211156107015760008155600101610793565b808211156107015760006107bb82826107c4565b506001016107a7565b5080546107d090610c9b565b6000825580601f106107e0575050565b601f0160209004906000526020600020908101906107fe9190610792565b50565b60006020828403121561081357600080fd5b5035919050565b6000815180845260005b8181101561084057602081850181015186830182015201610824565b506000602082860101526020601f19601f83011685010191505092915050565b600081518084526020808501808196508360051b8101915082860160005b858110156108a857828403895261089684835161081a565b9885019893509084019060010161087e565b5091979650505050505050565b6080808252855190820181905260009060209060a0840190828901845b828110156108f75781516001600160a01b0316845292840192908401906001016108d2565b5050508381038285015286518082528783019183019060005b8181101561092c57835183529284019291840191600101610910565b505084810360408601526109408188610860565b925050508281036060840152610956818561081a565b979650505050505050565b602081526000610974602083018461081a565b9392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156109ba576109ba61097b565b604052919050565b600067ffffffffffffffff8211156109dc576109dc61097b565b5060051b60200190565b6001600160a01b03811681146107fe57600080fd5b600082601f830112610a0c57600080fd5b81356020610a21610a1c836109c2565b610991565b82815260059290921b84018101918181019086841115610a4057600080fd5b8286015b84811015610a5b5780358352918301918301610a44565b509695505050505050565b600067ffffffffffffffff831115610a8057610a8061097b565b610a93601f8401601f1916602001610991565b9050828152838383011115610aa757600080fd5b828260208301376000602084830101529392505050565b600082601f830112610acf57600080fd5b81356020610adf610a1c836109c2565b82815260059290921b84018101918181019086841115610afe57600080fd5b8286015b84811015610a5b57803567ffffffffffffffff811115610b225760008081fd5b8701603f81018913610b345760008081fd5b610b45898683013560408401610a66565b845250918301918301610b02565b600082601f830112610b6457600080fd5b61097483833560208501610a66565b60008060008060808587031215610b8957600080fd5b843567ffffffffffffffff80821115610ba157600080fd5b818701915087601f830112610bb557600080fd5b81356020610bc5610a1c836109c2565b82815260059290921b8401810191818101908b841115610be457600080fd5b948201945b83861015610c0b578535610bfc816109e6565b82529482019490820190610be9565b98505088013592505080821115610c2157600080fd5b610c2d888389016109fb565b94506040870135915080821115610c4357600080fd5b610c4f88838901610abe565b93506060870135915080821115610c6557600080fd5b50610c7287828801610b53565b91505092959194509250565b600060208284031215610c9057600080fd5b8135610974816109e6565b600181811c90821680610caf57607f821691505b602082108103610ccf57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610ce757600080fd5b5051919050565b601f821115610d3857600081815260208120601f850160051c81016020861015610d155750805b601f850160051c820191505b81811015610d3457828155600101610d21565b5050505b505050565b815167ffffffffffffffff811115610d5757610d5761097b565b610d6b81610d658454610c9b565b84610cee565b602080601f831160018114610da05760008415610d885750858301515b600019600386901b1c1916600185901b178555610d34565b600085815260208120601f198616915b82811015610dcf57888601518255948401946001909101908401610db0565b5085821015610ded5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060018201610e1d57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212205573b539a21d7fdcbbef8b4588601b59f9761d14ceaca977a7cb5fe3b132e18b64736f6c63430008110033";

type DAOProposerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DAOProposerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DAOProposer__factory extends ContractFactory {
  constructor(...args: DAOProposerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DAOProposer> {
    return super.deploy(overrides || {}) as Promise<DAOProposer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DAOProposer {
    return super.attach(address) as DAOProposer;
  }
  override connect(signer: Signer): DAOProposer__factory {
    return super.connect(signer) as DAOProposer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DAOProposerInterface {
    return new utils.Interface(_abi) as DAOProposerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DAOProposer {
    return new Contract(address, _abi, signerOrProvider) as DAOProposer;
  }
}