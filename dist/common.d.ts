import { DeferredTopicFilter, EventFragment, EventLog, LogDescription, TransactionRequest, Typed, ContractTransactionResponse, FunctionFragment, ContractTransaction } from 'ethers';

interface TypedDeferredTopicFilter<_TCEvent extends TypedContractEvent> extends DeferredTopicFilter {
}
interface TypedContractEvent<InputTuple extends Array<any> = any, OutputTuple extends Array<any> = any, OutputObject = any> {
    (...args: Partial<InputTuple>): TypedDeferredTopicFilter<TypedContractEvent<InputTuple, OutputTuple, OutputObject>>;
    name: string;
    fragment: EventFragment;
    getFragment(...args: Partial<InputTuple>): EventFragment;
}
type __TypechainAOutputTuple<T> = T extends TypedContractEvent<infer _U, infer W> ? W : never;
type __TypechainOutputObject<T> = T extends TypedContractEvent<infer _U, infer _W, infer V> ? V : never;
interface TypedEventLog<TCEvent extends TypedContractEvent> extends Omit<EventLog, "args"> {
    args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}
interface TypedLogDescription<TCEvent extends TypedContractEvent> extends Omit<LogDescription, "args"> {
    args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}
type TypedListener<TCEvent extends TypedContractEvent> = (...listenerArg: [
    ...__TypechainAOutputTuple<TCEvent>,
    TypedEventLog<TCEvent>,
    ...undefined[]
]) => void;
type MinEthersFactory<C, ARGS> = {
    deploy(...a: ARGS[]): Promise<C>;
};
type GetContractTypeFromFactory<F> = F extends MinEthersFactory<infer C, any> ? C : never;
type GetARGsTypeFromFactory<F> = F extends MinEthersFactory<any, any> ? Parameters<F["deploy"]> : never;
type StateMutability = "nonpayable" | "payable" | "view";
type BaseOverrides = Omit<TransactionRequest, "to" | "data">;
type NonPayableOverrides = Omit<BaseOverrides, "value" | "blockTag" | "enableCcipRead">;
type PayableOverrides = Omit<BaseOverrides, "blockTag" | "enableCcipRead">;
type ViewOverrides = Omit<TransactionRequest, "to" | "data">;
type Overrides<S extends StateMutability> = S extends "nonpayable" ? NonPayableOverrides : S extends "payable" ? PayableOverrides : ViewOverrides;
type PostfixOverrides<A extends Array<any>, S extends StateMutability> = A | [...A, Overrides<S>];
type ContractMethodArgs<A extends Array<any>, S extends StateMutability> = PostfixOverrides<{
    [I in keyof A]-?: A[I] | Typed;
}, S>;
type DefaultReturnType<R> = R extends Array<any> ? R[0] : R;
interface TypedContractMethod<A extends Array<any> = Array<any>, R = any, S extends StateMutability = "payable"> {
    (...args: ContractMethodArgs<A, S>): S extends "view" ? Promise<DefaultReturnType<R>> : Promise<ContractTransactionResponse>;
    name: string;
    fragment: FunctionFragment;
    getFragment(...args: ContractMethodArgs<A, S>): FunctionFragment;
    populateTransaction(...args: ContractMethodArgs<A, S>): Promise<ContractTransaction>;
    staticCall(...args: ContractMethodArgs<A, "view">): Promise<DefaultReturnType<R>>;
    send(...args: ContractMethodArgs<A, S>): Promise<ContractTransactionResponse>;
    estimateGas(...args: ContractMethodArgs<A, S>): Promise<bigint>;
    staticCallResult(...args: ContractMethodArgs<A, "view">): Promise<R>;
}

export type { BaseOverrides, ContractMethodArgs, DefaultReturnType, GetARGsTypeFromFactory, GetContractTypeFromFactory, MinEthersFactory, NonPayableOverrides, Overrides, PayableOverrides, PostfixOverrides, StateMutability, TypedContractEvent, TypedContractMethod, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedLogDescription, ViewOverrides };
