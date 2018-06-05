/**
 * @interface ResponseData http请求返回值类型
 */
export default interface ResponseData<DataType>{
    /**
     * @field 返回数据
     */
    em?:DataType
    /**
     * @field 错误码
     */
    ec?:number
}