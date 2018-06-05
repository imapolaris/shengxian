/**
 * @interface HttpState http请求的状态
 */
export default interface HttpState {
    /**
     * @field loading 是否正在进行http请求
     */
    loading:boolean;
}

/**
 * 默认值
 * @type HttpState
 */
export const initHttpState:HttpState={
    loading:false
}