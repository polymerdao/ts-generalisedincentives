import { BigNumberish, AddressLike, Interface, FunctionFragment, EventFragment, BytesLike, Result, BaseContract, ContractRunner, Listener, ContractMethod } from 'ethers';
import { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from './common.js';

declare namespace IMessageEscrowStructs {
    type IncentiveDescriptionStruct = {
        maxGasDelivery: BigNumberish;
        maxGasAck: BigNumberish;
        refundGasTo: AddressLike;
        priceOfDeliveryGas: BigNumberish;
        priceOfAckGas: BigNumberish;
        targetDelta: BigNumberish;
    };
    type IncentiveDescriptionStructOutput = [
        maxGasDelivery: bigint,
        maxGasAck: bigint,
        refundGasTo: string,
        priceOfDeliveryGas: bigint,
        priceOfAckGas: bigint,
        targetDelta: bigint
    ] & {
        maxGasDelivery: bigint;
        maxGasAck: bigint;
        refundGasTo: string;
        priceOfDeliveryGas: bigint;
        priceOfAckGas: bigint;
        targetDelta: bigint;
    };
}
interface SimpleApplicationInterface extends Interface {
    getFunction(nameOrSignature: "receiveAck" | "receiveMessage" | "setRemoteImplementation" | "submitMessage"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Event"): EventFragment;
    encodeFunctionData(functionFragment: "receiveAck", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "receiveMessage", values: [BytesLike, BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setRemoteImplementation", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "submitMessage", values: [
        BytesLike,
        BytesLike,
        BytesLike,
        IMessageEscrowStructs.IncentiveDescriptionStruct,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "receiveAck", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRemoteImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitMessage", data: BytesLike): Result;
}
declare namespace EventEvent {
    type InputTuple = [message: BytesLike];
    type OutputTuple = [message: string];
    interface OutputObject {
        message: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
interface SimpleApplication extends BaseContract {
    connect(runner?: ContractRunner | null): SimpleApplication;
    waitForDeployment(): Promise<this>;
    interface: SimpleApplicationInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    receiveAck: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        acknowledgement: BytesLike
    ], [
        void
    ], "nonpayable">;
    receiveMessage: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike,
        message: BytesLike
    ], [
        string
    ], "nonpayable">;
    setRemoteImplementation: TypedContractMethod<[
        destinationIdentifier: BytesLike,
        implementation: BytesLike
    ], [
        void
    ], "nonpayable">;
    submitMessage: TypedContractMethod<[
        destinationIdentifier: BytesLike,
        destinationAddress: BytesLike,
        message: BytesLike,
        incentive: IMessageEscrowStructs.IncentiveDescriptionStruct,
        deadline: BigNumberish
    ], [
        [bigint, string] & {
            gasRefund: bigint;
            messageIdentifier: string;
        }
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "receiveAck"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        acknowledgement: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "receiveMessage"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike,
        message: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "setRemoteImplementation"): TypedContractMethod<[
        destinationIdentifier: BytesLike,
        implementation: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "submitMessage"): TypedContractMethod<[
        destinationIdentifier: BytesLike,
        destinationAddress: BytesLike,
        message: BytesLike,
        incentive: IMessageEscrowStructs.IncentiveDescriptionStruct,
        deadline: BigNumberish
    ], [
        [bigint, string] & {
            gasRefund: bigint;
            messageIdentifier: string;
        }
    ], "payable">;
    getEvent(key: "Event"): TypedContractEvent<EventEvent.InputTuple, EventEvent.OutputTuple, EventEvent.OutputObject>;
    filters: {
        "Event(bytes)": TypedContractEvent<EventEvent.InputTuple, EventEvent.OutputTuple, EventEvent.OutputObject>;
        Event: TypedContractEvent<EventEvent.InputTuple, EventEvent.OutputTuple, EventEvent.OutputObject>;
    };
}

export { EventEvent, IMessageEscrowStructs, type SimpleApplication, type SimpleApplicationInterface };
