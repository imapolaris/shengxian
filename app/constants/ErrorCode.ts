import {NumberMap} from "../common/utils/types";
import * as _ from "lodash";
const ErrorMessages:NumberMap<_.TemplateExecutor>={};

function errMessage(message:string){
    return function (target:any,propertyKey:string){
        let key:number = parseInt(target[propertyKey]);
        ErrorMessages[key] = _.template(message);
    }
}

/**
 * @class ErrorCode 错误码
 */
export class ErrorCode{
    @errMessage("成功")
    static SUCCESS = 0;

    @errMessage("HTTP请求返回码错误")
    static HTTP_REQUEST_ERROR       = 1;
    @errMessage("AXIOS网络请求失败")
    static AXIOS_HTTP_ERROR         = 2;
    @errMessage("SAGA错误")
    static SAGA_HTTP_ERROR          = 3;
    @errMessage("请求超时")
    static TIMEOUT                  = 4;
    @errMessage("收到服务器数据解析失败")
    static HTTP_RESPONSE_DATA_ERROR = 5;

    @errMessage("网络请求错误")
    static TEST_ERROR                =10000;
    @errMessage("网络请求错误${error}")
    static TEST_ERROR_WITH_PARAM     =10001;

}

export const getErrorMessage=(code:number,param?:any)=>{
    const msg = ErrorMessages[code]
    if(msg){
        return msg(param)
    }else{
        console.log("客户端不存在的错误码=>code:",code," param:",param);
		// return `错误code:${code},param:${param}`;
		return param;		//苹果审核期先不加错误码
    }
}