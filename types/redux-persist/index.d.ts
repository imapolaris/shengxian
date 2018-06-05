declare module 'redux-persist' {
    import {Reducer, Store} from "redux";

    export interface PersistState{
        version: number,
        rehydrated: boolean
    }

    export interface PersistedState{
        _persist: PersistState,
    }

    export interface Transform{
        in: (state:Object, key:string) => Object,
        out: (state:Object, key:string) => Object,
        config?: PersistConfig
    }

    export interface PersistConfig{
        version?: number,
        storage: Object,
        key: string,
        keyPrefix?: string, // @TODO remove in v6
        blacklist?: Array<string>,
        whitelist?: Array<string>,
        transforms?: Array<Transform>,
        throttle?: number,
        migrate?: (state:PersistedState, version:number) => Promise<PersistedState>,
        stateReconciler?: false | Function,
        getStoredState?: (config:PersistConfig) => Promise<PersistedState>, // used for migrations
        debug?: boolean,
        serialize?: boolean,
    }

    export interface PersistorOptions{
        enhancer?: Function,
    }

    export interface Persistor<S> extends Store<S> {
        purge: () => Promise<any>,
        flush: () => Promise<any>
    }

    export type RehydrateErrorType = any

    export type RehydrateAction = {
        type: 'redux-persist/REHYDRATE',
        key: string,
        payload?: Object,
        err?: RehydrateErrorType,
    }

    type PersistorState = {
        registry: Array<string>,
        bootstrapped: boolean,
    }

    type RegisterAction = {
        type: 'redux-persist/REGISTER',
        key: string,
    }

    type PersistorAction = RehydrateAction | RegisterAction

    type Reducers = {
        [key: string]: Function,
    }

    type BoostrappedCb = () => any

    export function persistCombineReducers<State>(
        config: PersistConfig,
        reducers: Reducers
    ): Reducer<State>;

    export function persistReducer(
        config: PersistConfig,
        reducer: Reducer<any>
    ): Reducer<any>;

    export function persistStore(
        store: Object,
        persistorOptions?: PersistorOptions,
        cb?: BoostrappedCb
    ): Persistor<any>;
}

declare module 'redux-persist/es/integration/react';
declare module 'redux-persist/es/storage';