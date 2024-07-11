import { BytesLike, BigNumberish, AddressLike, Interface, FunctionFragment, EventFragment, Result, BaseContract, ContractRunner, Listener, ContractMethod } from 'ethers';
import { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from './common.cjs';

type IbcEndpointStruct = {
    portId: string;
    channelId: BytesLike;
};
type IbcEndpointStructOutput = [portId: string, channelId: string] & {
    portId: string;
    channelId: string;
};
type HeightStruct = {
    revision_number: BigNumberish;
    revision_height: BigNumberish;
};
type HeightStructOutput = [
    revision_number: bigint,
    revision_height: bigint
] & {
    revision_number: bigint;
    revision_height: bigint;
};
type IbcPacketStruct = {
    src: IbcEndpointStruct;
    dest: IbcEndpointStruct;
    sequence: BigNumberish;
    data: BytesLike;
    timeoutHeight: HeightStruct;
    timeoutTimestamp: BigNumberish;
};
type IbcPacketStructOutput = [
    src: IbcEndpointStructOutput,
    dest: IbcEndpointStructOutput,
    sequence: bigint,
    data: string,
    timeoutHeight: HeightStructOutput,
    timeoutTimestamp: bigint
] & {
    src: IbcEndpointStructOutput;
    dest: IbcEndpointStructOutput;
    sequence: bigint;
    data: string;
    timeoutHeight: HeightStructOutput;
    timeoutTimestamp: bigint;
};
type AckPacketStruct = {
    success: boolean;
    data: BytesLike;
};
type AckPacketStructOutput = [success: boolean, data: string] & {
    success: boolean;
    data: string;
};
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
interface IncentivizedPolymerEscrowInterface extends Interface {
    getFunction(nameOrSignature: "SEND_LOST_GAS_TO" | "bounty" | "connectedChannels" | "convertEVMTo65" | "dispatcher" | "estimateAdditionalCost(bytes32)" | "estimateAdditionalCost()" | "implementationAddress" | "implementationAddressHash" | "increaseBounty" | "isVerifiedMessageHash" | "messageDelivered" | "onAcknowledgementPacket" | "onChanOpenAck" | "onChanOpenConfirm" | "onChanOpenInit" | "onChanOpenTry" | "onCloseIbcChannel" | "onRecvPacket" | "onTimeoutPacket" | "owner" | "processPacket" | "proofValidPeriod" | "recoverAck" | "reemitAckMessage" | "renounceOwnership" | "setRemoteImplementation" | "submitMessage" | "supportedVersions" | "thisBytes65" | "timeoutMessage" | "transferOwnership" | "triggerChannelInit"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "BountyClaimed" | "BountyIncreased" | "BountyPlaced" | "MessageAcked" | "MessageDelivered" | "MessageTimedOut" | "OwnershipTransferred" | "RemoteImplementationSet" | "TimeoutInitiated"): EventFragment;
    encodeFunctionData(functionFragment: "SEND_LOST_GAS_TO", values?: undefined): string;
    encodeFunctionData(functionFragment: "bounty", values: [AddressLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "connectedChannels", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "convertEVMTo65", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "dispatcher", values?: undefined): string;
    encodeFunctionData(functionFragment: "estimateAdditionalCost(bytes32)", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "estimateAdditionalCost()", values?: undefined): string;
    encodeFunctionData(functionFragment: "implementationAddress", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "implementationAddressHash", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "increaseBounty", values: [AddressLike, BytesLike, BytesLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isVerifiedMessageHash", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "messageDelivered", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "onAcknowledgementPacket", values: [IbcPacketStruct, AckPacketStruct]): string;
    encodeFunctionData(functionFragment: "onChanOpenAck", values: [BytesLike, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "onChanOpenConfirm", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "onChanOpenInit", values: [BigNumberish, string[], string, string]): string;
    encodeFunctionData(functionFragment: "onChanOpenTry", values: [BigNumberish, string[], BytesLike, string, BytesLike, string]): string;
    encodeFunctionData(functionFragment: "onCloseIbcChannel", values: [BytesLike, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "onRecvPacket", values: [IbcPacketStruct]): string;
    encodeFunctionData(functionFragment: "onTimeoutPacket", values: [IbcPacketStruct]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "processPacket", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "proofValidPeriod", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "recoverAck", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "reemitAckMessage", values: [BytesLike, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setRemoteImplementation", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "submitMessage", values: [
        BytesLike,
        BytesLike,
        BytesLike,
        IMessageEscrowStructs.IncentiveDescriptionStruct,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "supportedVersions", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "thisBytes65", values?: undefined): string;
    encodeFunctionData(functionFragment: "timeoutMessage", values: [BytesLike, BytesLike, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "triggerChannelInit", values: [string, BigNumberish, boolean, string[], string]): string;
    decodeFunctionResult(functionFragment: "SEND_LOST_GAS_TO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bounty", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "connectedChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convertEVMTo65", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dispatcher", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimateAdditionalCost(bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimateAdditionalCost()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "implementationAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "implementationAddressHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseBounty", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isVerifiedMessageHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messageDelivered", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onAcknowledgementPacket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onChanOpenAck", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onChanOpenConfirm", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onChanOpenInit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onChanOpenTry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onCloseIbcChannel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onRecvPacket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onTimeoutPacket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processPacket", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proofValidPeriod", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recoverAck", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reemitAckMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRemoteImplementation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportedVersions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "thisBytes65", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "timeoutMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "triggerChannelInit", data: BytesLike): Result;
}
declare namespace BountyClaimedEvent {
    type InputTuple = [
        destinationImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike,
        gasSpentOnDestination: BigNumberish,
        gasSpentOnSource: BigNumberish,
        destinationRelayerReward: BigNumberish,
        sourceRelayerReward: BigNumberish
    ];
    type OutputTuple = [
        destinationImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string,
        gasSpentOnDestination: bigint,
        gasSpentOnSource: bigint,
        destinationRelayerReward: bigint,
        sourceRelayerReward: bigint
    ];
    interface OutputObject {
        destinationImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
        gasSpentOnDestination: bigint;
        gasSpentOnSource: bigint;
        destinationRelayerReward: bigint;
        sourceRelayerReward: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace BountyIncreasedEvent {
    type InputTuple = [
        messageIdentifier: BytesLike,
        newDeliveryGasPrice: BigNumberish,
        newAckGasPrice: BigNumberish
    ];
    type OutputTuple = [
        messageIdentifier: string,
        newDeliveryGasPrice: bigint,
        newAckGasPrice: bigint
    ];
    interface OutputObject {
        messageIdentifier: string;
        newDeliveryGasPrice: bigint;
        newAckGasPrice: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace BountyPlacedEvent {
    type InputTuple = [
        destinationImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike,
        incentive: IMessageEscrowStructs.IncentiveDescriptionStruct
    ];
    type OutputTuple = [
        destinationImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string,
        incentive: IMessageEscrowStructs.IncentiveDescriptionStructOutput
    ];
    interface OutputObject {
        destinationImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
        incentive: IMessageEscrowStructs.IncentiveDescriptionStructOutput;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace MessageAckedEvent {
    type InputTuple = [
        destinationImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ];
    type OutputTuple = [
        destinationImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string
    ];
    interface OutputObject {
        destinationImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace MessageDeliveredEvent {
    type InputTuple = [
        sourceImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ];
    type OutputTuple = [
        sourceImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string
    ];
    interface OutputObject {
        sourceImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace MessageTimedOutEvent {
    type InputTuple = [
        destinationImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ];
    type OutputTuple = [
        destinationImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string
    ];
    interface OutputObject {
        destinationImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace RemoteImplementationSetEvent {
    type InputTuple = [
        application: AddressLike,
        chainIdentifier: BytesLike,
        implementationAddressHash: BytesLike,
        implementationAddress: BytesLike
    ];
    type OutputTuple = [
        application: string,
        chainIdentifier: string,
        implementationAddressHash: string,
        implementationAddress: string
    ];
    interface OutputObject {
        application: string;
        chainIdentifier: string;
        implementationAddressHash: string;
        implementationAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
declare namespace TimeoutInitiatedEvent {
    type InputTuple = [
        sourceImplementation: BytesLike,
        chainIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ];
    type OutputTuple = [
        sourceImplementation: string,
        chainIdentifier: string,
        messageIdentifier: string
    ];
    interface OutputObject {
        sourceImplementation: string;
        chainIdentifier: string;
        messageIdentifier: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
interface IncentivizedPolymerEscrow extends BaseContract {
    connect(runner?: ContractRunner | null): IncentivizedPolymerEscrow;
    waitForDeployment(): Promise<this>;
    interface: IncentivizedPolymerEscrowInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    SEND_LOST_GAS_TO: TypedContractMethod<[], [string], "view">;
    bounty: TypedContractMethod<[
        fromApplication: AddressLike,
        destinationIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ], [
        IMessageEscrowStructs.IncentiveDescriptionStructOutput
    ], "view">;
    connectedChannels: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], "view">;
    convertEVMTo65: TypedContractMethod<[
        evmAddress: AddressLike
    ], [
        string
    ], "view">;
    dispatcher: TypedContractMethod<[], [string], "view">;
    "estimateAdditionalCost(bytes32)": TypedContractMethod<[
        arg0: BytesLike
    ], [
        [string, bigint] & {
            asset: string;
            amount: bigint;
        }
    ], "view">;
    "estimateAdditionalCost()": TypedContractMethod<[
    ], [
        [string, bigint] & {
            asset: string;
            amount: bigint;
        }
    ], "view">;
    implementationAddress: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    implementationAddressHash: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    increaseBounty: TypedContractMethod<[
        fromApplication: AddressLike,
        destinationIdentifier: BytesLike,
        messageIdentifier: BytesLike,
        deliveryGasPriceIncrease: BigNumberish,
        ackGasPriceIncrease: BigNumberish
    ], [
        void
    ], "payable">;
    isVerifiedMessageHash: TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            string,
            string
        ] & {
            chainIdentifier: string;
            implementationIdentifier: string;
        }
    ], "view">;
    messageDelivered: TypedContractMethod<[
        sourceIdentifier: BytesLike,
        sourceImplementationIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ], [
        string
    ], "view">;
    onAcknowledgementPacket: TypedContractMethod<[
        packet: IbcPacketStruct,
        ack: AckPacketStruct
    ], [
        void
    ], "nonpayable">;
    onChanOpenAck: TypedContractMethod<[
        channelId: BytesLike,
        arg1: BytesLike,
        counterpartyVersion: string
    ], [
        void
    ], "nonpayable">;
    onChanOpenConfirm: TypedContractMethod<[
        channelId: BytesLike
    ], [
        void
    ], "nonpayable">;
    onChanOpenInit: TypedContractMethod<[
        ordering: BigNumberish,
        arg1: string[],
        arg2: string,
        version: string
    ], [
        string
    ], "view">;
    onChanOpenTry: TypedContractMethod<[
        ordering: BigNumberish,
        arg1: string[],
        channelId: BytesLike,
        arg3: string,
        arg4: BytesLike,
        counterpartyVersion: string
    ], [
        string
    ], "nonpayable">;
    onCloseIbcChannel: TypedContractMethod<[
        channelId: BytesLike,
        arg1: string,
        arg2: BytesLike
    ], [
        void
    ], "nonpayable">;
    onRecvPacket: TypedContractMethod<[
        packet: IbcPacketStruct
    ], [
        AckPacketStructOutput
    ], "nonpayable">;
    onTimeoutPacket: TypedContractMethod<[
        packet: IbcPacketStruct
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    processPacket: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike
    ], [
        void
    ], "payable">;
    proofValidPeriod: TypedContractMethod<[
        destinationIdentifier: BytesLike
    ], [
        bigint
    ], "view">;
    recoverAck: TypedContractMethod<[
        messagingProtocolContext: BytesLike,
        rawMessage: BytesLike
    ], [
        void
    ], "nonpayable">;
    reemitAckMessage: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike
    ], [
        void
    ], "payable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
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
    supportedVersions: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        string
    ], "view">;
    thisBytes65: TypedContractMethod<[], [string], "view">;
    timeoutMessage: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        void
    ], "payable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    triggerChannelInit: TypedContractMethod<[
        version: string,
        ordering: BigNumberish,
        feeEnabled: boolean,
        connectionHops: string[],
        counterpartyPortId: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "SEND_LOST_GAS_TO"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "bounty"): TypedContractMethod<[
        fromApplication: AddressLike,
        destinationIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ], [
        IMessageEscrowStructs.IncentiveDescriptionStructOutput
    ], "view">;
    getFunction(nameOrSignature: "connectedChannels"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "convertEVMTo65"): TypedContractMethod<[evmAddress: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "dispatcher"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "estimateAdditionalCost(bytes32)"): TypedContractMethod<[
        arg0: BytesLike
    ], [
        [string, bigint] & {
            asset: string;
            amount: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "estimateAdditionalCost()"): TypedContractMethod<[
    ], [
        [string, bigint] & {
            asset: string;
            amount: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "implementationAddress"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "implementationAddressHash"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "increaseBounty"): TypedContractMethod<[
        fromApplication: AddressLike,
        destinationIdentifier: BytesLike,
        messageIdentifier: BytesLike,
        deliveryGasPriceIncrease: BigNumberish,
        ackGasPriceIncrease: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "isVerifiedMessageHash"): TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            string,
            string
        ] & {
            chainIdentifier: string;
            implementationIdentifier: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "messageDelivered"): TypedContractMethod<[
        sourceIdentifier: BytesLike,
        sourceImplementationIdentifier: BytesLike,
        messageIdentifier: BytesLike
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "onAcknowledgementPacket"): TypedContractMethod<[
        packet: IbcPacketStruct,
        ack: AckPacketStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "onChanOpenAck"): TypedContractMethod<[
        channelId: BytesLike,
        arg1: BytesLike,
        counterpartyVersion: string
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "onChanOpenConfirm"): TypedContractMethod<[channelId: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "onChanOpenInit"): TypedContractMethod<[
        ordering: BigNumberish,
        arg1: string[],
        arg2: string,
        version: string
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "onChanOpenTry"): TypedContractMethod<[
        ordering: BigNumberish,
        arg1: string[],
        channelId: BytesLike,
        arg3: string,
        arg4: BytesLike,
        counterpartyVersion: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "onCloseIbcChannel"): TypedContractMethod<[
        channelId: BytesLike,
        arg1: string,
        arg2: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "onRecvPacket"): TypedContractMethod<[
        packet: IbcPacketStruct
    ], [
        AckPacketStructOutput
    ], "nonpayable">;
    getFunction(nameOrSignature: "onTimeoutPacket"): TypedContractMethod<[packet: IbcPacketStruct], [void], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "processPacket"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "proofValidPeriod"): TypedContractMethod<[destinationIdentifier: BytesLike], [bigint], "view">;
    getFunction(nameOrSignature: "recoverAck"): TypedContractMethod<[
        messagingProtocolContext: BytesLike,
        rawMessage: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "reemitAckMessage"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
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
    getFunction(nameOrSignature: "supportedVersions"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "thisBytes65"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "timeoutMessage"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BytesLike,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "triggerChannelInit"): TypedContractMethod<[
        version: string,
        ordering: BigNumberish,
        feeEnabled: boolean,
        connectionHops: string[],
        counterpartyPortId: string
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "BountyClaimed"): TypedContractEvent<BountyClaimedEvent.InputTuple, BountyClaimedEvent.OutputTuple, BountyClaimedEvent.OutputObject>;
    getEvent(key: "BountyIncreased"): TypedContractEvent<BountyIncreasedEvent.InputTuple, BountyIncreasedEvent.OutputTuple, BountyIncreasedEvent.OutputObject>;
    getEvent(key: "BountyPlaced"): TypedContractEvent<BountyPlacedEvent.InputTuple, BountyPlacedEvent.OutputTuple, BountyPlacedEvent.OutputObject>;
    getEvent(key: "MessageAcked"): TypedContractEvent<MessageAckedEvent.InputTuple, MessageAckedEvent.OutputTuple, MessageAckedEvent.OutputObject>;
    getEvent(key: "MessageDelivered"): TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
    getEvent(key: "MessageTimedOut"): TypedContractEvent<MessageTimedOutEvent.InputTuple, MessageTimedOutEvent.OutputTuple, MessageTimedOutEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "RemoteImplementationSet"): TypedContractEvent<RemoteImplementationSetEvent.InputTuple, RemoteImplementationSetEvent.OutputTuple, RemoteImplementationSetEvent.OutputObject>;
    getEvent(key: "TimeoutInitiated"): TypedContractEvent<TimeoutInitiatedEvent.InputTuple, TimeoutInitiatedEvent.OutputTuple, TimeoutInitiatedEvent.OutputObject>;
    filters: {
        "BountyClaimed(bytes,bytes32,bytes32,uint64,uint64,uint128,uint128)": TypedContractEvent<BountyClaimedEvent.InputTuple, BountyClaimedEvent.OutputTuple, BountyClaimedEvent.OutputObject>;
        BountyClaimed: TypedContractEvent<BountyClaimedEvent.InputTuple, BountyClaimedEvent.OutputTuple, BountyClaimedEvent.OutputObject>;
        "BountyIncreased(bytes32,uint96,uint96)": TypedContractEvent<BountyIncreasedEvent.InputTuple, BountyIncreasedEvent.OutputTuple, BountyIncreasedEvent.OutputObject>;
        BountyIncreased: TypedContractEvent<BountyIncreasedEvent.InputTuple, BountyIncreasedEvent.OutputTuple, BountyIncreasedEvent.OutputObject>;
        "BountyPlaced(bytes,bytes32,bytes32,tuple)": TypedContractEvent<BountyPlacedEvent.InputTuple, BountyPlacedEvent.OutputTuple, BountyPlacedEvent.OutputObject>;
        BountyPlaced: TypedContractEvent<BountyPlacedEvent.InputTuple, BountyPlacedEvent.OutputTuple, BountyPlacedEvent.OutputObject>;
        "MessageAcked(bytes,bytes32,bytes32)": TypedContractEvent<MessageAckedEvent.InputTuple, MessageAckedEvent.OutputTuple, MessageAckedEvent.OutputObject>;
        MessageAcked: TypedContractEvent<MessageAckedEvent.InputTuple, MessageAckedEvent.OutputTuple, MessageAckedEvent.OutputObject>;
        "MessageDelivered(bytes,bytes32,bytes32)": TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
        MessageDelivered: TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
        "MessageTimedOut(bytes,bytes32,bytes32)": TypedContractEvent<MessageTimedOutEvent.InputTuple, MessageTimedOutEvent.OutputTuple, MessageTimedOutEvent.OutputObject>;
        MessageTimedOut: TypedContractEvent<MessageTimedOutEvent.InputTuple, MessageTimedOutEvent.OutputTuple, MessageTimedOutEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "RemoteImplementationSet(address,bytes32,bytes32,bytes)": TypedContractEvent<RemoteImplementationSetEvent.InputTuple, RemoteImplementationSetEvent.OutputTuple, RemoteImplementationSetEvent.OutputObject>;
        RemoteImplementationSet: TypedContractEvent<RemoteImplementationSetEvent.InputTuple, RemoteImplementationSetEvent.OutputTuple, RemoteImplementationSetEvent.OutputObject>;
        "TimeoutInitiated(bytes,bytes32,bytes32)": TypedContractEvent<TimeoutInitiatedEvent.InputTuple, TimeoutInitiatedEvent.OutputTuple, TimeoutInitiatedEvent.OutputObject>;
        TimeoutInitiated: TypedContractEvent<TimeoutInitiatedEvent.InputTuple, TimeoutInitiatedEvent.OutputTuple, TimeoutInitiatedEvent.OutputObject>;
    };
}

export { type AckPacketStruct, type AckPacketStructOutput, BountyClaimedEvent, BountyIncreasedEvent, BountyPlacedEvent, type HeightStruct, type HeightStructOutput, IMessageEscrowStructs, type IbcEndpointStruct, type IbcEndpointStructOutput, type IbcPacketStruct, type IbcPacketStructOutput, type IncentivizedPolymerEscrow, type IncentivizedPolymerEscrowInterface, MessageAckedEvent, MessageDeliveredEvent, MessageTimedOutEvent, OwnershipTransferredEvent, RemoteImplementationSetEvent, TimeoutInitiatedEvent };
