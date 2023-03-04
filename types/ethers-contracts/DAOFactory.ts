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

export interface DAOFactoryInterface extends utils.Interface {
  functions: {
    "createDAO((string,string,string),(string,string,uint256),(uint256,uint256,uint256))": FunctionFragment;
    "daos(uint256)": FunctionFragment;
    "getDAO(uint256)": FunctionFragment;
    "getDAOCount()": FunctionFragment;
    "governorDeployer()": FunctionFragment;
    "proposerDeployer()": FunctionFragment;
    "tokenDeployer()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createDAO"
      | "daos"
      | "getDAO"
      | "getDAOCount"
      | "governorDeployer"
      | "proposerDeployer"
      | "tokenDeployer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createDAO",
    values: [DaoDataStruct, DaoTokenStruct, DaoParamsStruct]
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

  decodeFunctionResult(functionFragment: "createDAO", data: BytesLike): Result;
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

  events: {
    "DAOCreated(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DAOCreated"): EventFragment;
}

export interface DAOCreatedEventObject {
  deployer: string;
  dao: string;
  token: string;
  proposer: string;
}
export type DAOCreatedEvent = TypedEvent<
  [string, string, string, string],
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
    createDAO(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
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
  };

  createDAO(
    _data: DaoDataStruct,
    _token: DaoTokenStruct,
    _params: DaoParamsStruct,
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

  callStatic: {
    createDAO(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
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
  };

  filters: {
    "DAOCreated(address,address,address,address)"(
      deployer?: PromiseOrValue<string> | null,
      dao?: null,
      token?: null,
      proposer?: null
    ): DAOCreatedEventFilter;
    DAOCreated(
      deployer?: PromiseOrValue<string> | null,
      dao?: null,
      token?: null,
      proposer?: null
    ): DAOCreatedEventFilter;
  };

  estimateGas: {
    createDAO(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
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
  };

  populateTransaction: {
    createDAO(
      _data: DaoDataStruct,
      _token: DaoTokenStruct,
      _params: DaoParamsStruct,
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
  };
}
