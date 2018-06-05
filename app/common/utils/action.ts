/**
 * @class ActionError
 */

export class ActionError extends Error{
    // 错误码
    errorCode?:number;
    // 错误相关的其他参数
    param?:any;
    constructor(errorCode?:number,message?:string,param?:any){
        super(message)
        this.errorCode  =errorCode
        this.name = 'ActionError';
        this.param = param;
        //TODO react-native 不支持
        //Object.setPrototypeOf(this,new.target.prototype)
        //@ts-ignore
        //Object.setPrototypeOf ? Object.setPrototypeOf(this, Error.prototype) : this.__proto__ = Error.prototype
        if (Error.captureStackTrace) {
            //@ts-ignore
            Error.captureStackTrace(this, ActionError);
        }
    }
}

/**
 * @interface BaseAction action基类
 */
export interface BaseAction{
    type: string                    // action类型
}

/**
 * @interface ActionMeta meta信息
 */
export interface ActionMeta{
    force:boolean
}

/**
 * @interface Action<Payload>  Action类,Payload为action中的数据
 * error为true的时候payload表示一个
 */
export interface Action<Payload> extends BaseAction{
    payload?:Payload | ActionError
    error?:boolean
    meta?:ActionMeta
}

/**
 * @interface AsyncActionFlag 异步action分类
 */
export enum AsyncActionFlag{
    /**
     * @field 操作成功的action,payload中保存的是成功的返回值
     */
    FLAG_SUCCESS,
    /**
     * @field 操作失败的action,error为true,payload中保存的是ActionError
     */
    FLAG_FAILURE,
    /**
     * @field 操作超时的action,error为true,payload中保存的是ActionError
     */
    FLAG_TIMEOUT,
}


/**
 * @function createAction 返回一个Action
 * @param {string} type 类型
 * @param {ActionError | Payload} payload action附带的其他数据
 * @returns {Action<Payload>} 返回的action对象
 */
export const createAction=<Payload>(type:string,payload:Payload|ActionError|undefined = undefined):Action<Payload>=>{
    let error = (payload instanceof Error)
    return {
        type,
        payload,
        error
    }
};

/**
 * @interface AsyncRequest 异步请求
 */
export interface AsyncRequest<RequestParamType,RequestDataType>{
    /**
     * @field returnAction 处理返回值的action
     */
    returnAction:string
    /**
     * @field url 请求地址
     */
    url:string
    /**
     * @field params 请求参数
     */
    params?:RequestParamType
    /**
     * @field data 请求数据
     */
    data?:RequestDataType
    /**
     * @field method Http请求
     */
    method:string
    /**
     * @field timeout 是否自己处理timeout事件
     */
    timeout:boolean
    /**
     * @field loading 是否显示loading动画
     */
    loading:boolean
    /**
     * @field handleError 是否显示loading动画
     */
    handleError:boolean
    /**
     * @field extraData 附带的其他数据,(在回包处理的地方需要使用的其他数据)
     */
    extraData?:any
    /**
     * @field callback 回调函数,(返回成功之后的回调函数)
     */
    callback?:()=>void
    /**
     * @field force 请求强制发送到服务器
     */
    force?:boolean
}

/**
 * @function createAsyncResultAction 返回一个异步结果Action
 * @param {string} type 类型
 * @param {AsyncRequest} payload   请求参数
 * @returns {Action<Payload>} 返回的action对象
 */
export const createAsyncRequestAction=<ParamType,DataType>(type:string, payload:AsyncRequest<ParamType,DataType>)
    :Action< AsyncRequest<ParamType,DataType> >=>{
    //强制
    if(payload.force){
        return {
            type,
            payload,
            meta:{
                force:true
            },
            error:false
        }
    }
    return {
        type,
        payload,
        error:false
    }
};

/**
 * @interface AsyncResultAction 异步操作结果
 */
export interface AsyncResultAction<Payload,ParamType,DataType> extends  Action<Payload>{
    flag:AsyncActionFlag,
    request:AsyncRequest<ParamType,DataType>
}
/**
 * @function createAsyncResultAction 返回一个异步结果Action
 * @param {string} type 类型
 * @param {AsyncActionFlag} flag   标记类型
 * @param {ActionError | Payload} payload action附带的其他数据
 * @returns {Action<Payload>} 返回的action对象
 */
export const createAsyncResultAction=<Payload,ParamType,DataType>(
    type:string,
    flag:AsyncActionFlag,
    request:AsyncRequest<ParamType,DataType>,
    payload:Payload|ActionError|undefined = undefined):AsyncResultAction<Payload,ParamType,DataType>=>{

    let error = (payload instanceof Error)
    return {
        type,
        flag,
        request,
        payload,
        error
    }
};