/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type DaoDataStruct = {
  name: PromiseOrValue<string>;
  description: PromiseOrValue<string>;
  image: PromiseOrValue<string>;
};

export type DaoDataStructOutput = [string, string, string] & {
  name: string;
  description: string;
  image: string;
};

export type DaoWrappedTokenStruct = { assetToken: PromiseOrValue<string> };

export type DaoWrappedTokenStructOutput = [string] & { assetToken: string };

export type DaoParamsStruct = {
  quorumFraction: PromiseOrValue<BigNumberish>;
  votingDelay: PromiseOrValue<BigNumberish>;
  votingPeriod: PromiseOrValue<BigNumberish>;
};

export type DaoParamsStructOutput = [BigNumber, BigNumber, BigNumber] & {
  quorumFraction: BigNumber;
  votingDelay: BigNumber;
  votingPeriod: BigNumber;
};

export type DaoProposerStruct = {
  minimalVotingPower: PromiseOrValue<BigNumberish>;
};

export type DaoProposerStructOutput = [BigNumber] & {
  minimalVotingPower: BigNumber;
};

export type DaoTokenStruct = {
  name: PromiseOrValue<string>;
  symbol: PromiseOrValue<string>;
  initialSupply: PromiseOrValue<BigNumberish>;
};

export type DaoTokenStructOutput = [string, string, BigNumber] & {
  name: string;
  symbol: string;
  initialSupply: BigNumber;
};

export interface DAOFactoryInterface extends utils.Interface {
  functions: {
    "createDAOExistingToken((string,string,string),(address),(uint256,uint256,uint256),(uint256))": FunctionFragment;
    "createDAONewToken((string,string,string),(string,string,uint256),(uint256,uint256,uint256),(uint256))": FunctionFragment;
    "daos(uint256)": FunctionFragment;
    "getDAO(uint256)": FunctionFragment;
    "getDAOCount()": FunctionFragment;
    "governorDeployer()": FunctionFragment;
    "proposerDeployer()": FunctionFragment;
    "tokenDeployer()": FunctionFragment;
    "wrappedTokenDeployer()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createDAOExistingToken"
      | "createDAONewToken"
      | "daos"
      | "getDAO"
      | "getDAOCount"
      | "governorDeployer"
      | "proposerDeployer"
      | "tokenDeployer"
      | "wrappedTokenDeployer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createDAOExistingToken",
    values: [
      DaoDataStruct,
      DaoWrappedTokenStruct,
      DaoParamsStruct,
      DaoProposerStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createDAONewToken",
    values: [DaoDataStruct, DaoTokenStruct, DaoParamsStruct, DaoProposerStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "daos",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDAO",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDAOCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governorDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposerDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedTokenDeployer",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createDAOExistingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createDAONewToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "daos", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getDAO", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDAOCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governorDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposerDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrappedTokenDeployer",
    data: BytesLike
  ): Result;

  events: {
    "DAOCreated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DAOCreated"): EventFragment;
}

export interface DAOCreatedEventObject {
  deployer: string;
  dao: string;
}
export type DAOCreatedEvent = TypedEvent<
  [string, string],
  DAOCreatedEventObject
>;

export type DAOCreatedEventFilter = TypedEventFilter<DAOCreatedEvent>;

export interface DAOFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DAOFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createDAOExistingToken(
      _data: DaoDataStruct,
      _wrappedToken: DaoWrappedTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createDAONewToken(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    daos(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getDAO(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getDAOCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    governorDeployer(overrides?: CallOverrides): Promise<[string]>;

    proposerDeployer(overrides?: CallOverrides): Promise<[string]>;

    tokenDeployer(overrides?: CallOverrides): Promise<[string]>;

    wrappedTokenDeployer(overrides?: CallOverrides): Promise<[string]>;
  };

  createDAOExistingToken(
    _data: DaoDataStruct,
    _wrappedToken: DaoWrappedTokenStruct,
    _params: DaoParamsStruct,
    _proposer: DaoProposerStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createDAONewToken(
    _data: DaoDataStruct,
    _token: DaoTokenStruct,
    _params: DaoParamsStruct,
    _proposer: DaoProposerStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  daos(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getDAO(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getDAOCount(overrides?: CallOverrides): Promise<BigNumber>;

  governorDeployer(overrides?: CallOverrides): Promise<string>;

  proposerDeployer(overrides?: CallOverrides): Promise<string>;

  tokenDeployer(overrides?: CallOverrides): Promise<string>;

  wrappedTokenDeployer(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createDAOExistingToken(
      _data: DaoDataStruct,
      _wrappedToken: DaoWrappedTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: CallOverrides
    ): Promise<[string, string, string]>;

    createDAONewToken(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: CallOverrides
    ): Promise<[string, string, string]>;

    daos(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getDAO(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getDAOCount(overrides?: CallOverrides): Promise<BigNumber>;

    governorDeployer(overrides?: CallOverrides): Promise<string>;

    proposerDeployer(overrides?: CallOverrides): Promise<string>;

    tokenDeployer(overrides?: CallOverrides): Promise<string>;

    wrappedTokenDeployer(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "DAOCreated(address,address)"(
      deployer?: PromiseOrValue<string> | null,
      dao?: null
    ): DAOCreatedEventFilter;
    DAOCreated(
      deployer?: PromiseOrValue<string> | null,
      dao?: null
    ): DAOCreatedEventFilter;
  };

  estimateGas: {
    createDAOExistingToken(
      _data: DaoDataStruct,
      _wrappedToken: DaoWrappedTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createDAONewToken(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    daos(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDAO(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDAOCount(overrides?: CallOverrides): Promise<BigNumber>;

    governorDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    proposerDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    tokenDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    wrappedTokenDeployer(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createDAOExistingToken(
      _data: DaoDataStruct,
      _wrappedToken: DaoWrappedTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createDAONewToken(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
      _proposer: DaoProposerStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    daos(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDAO(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDAOCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governorDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposerDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wrappedTokenDeployer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
