import axios, {AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import ResponseData from "../common/utils/ResponseData";
import {ActionError} from "../common/utils/action";
import {ErrorCode, getErrorMessage} from "../constants/ErrorCode";
import {Config} from "../config/Config";
import * as QueryString from "qs";

axios.defaults.baseURL =Config.bNeiWang?Config.HTTP_BASE_URL_NEI:Config.HTTP_BASE_URL_WAY;
axios.defaults.timeout =Config.HTTP_DEFAULT_TIMEOUT + 2000;
axios.defaults.responseType ="json";
axios.defaults.headers.post['Content-Type'] ="application/x-www-form-urlencoded";
axios.defaults.headers.post['Accept'] ="application/vnd.sx.v1+json";
axios.defaults.headers.get['Content-Type'] ="application/x-www-form-urlencoded";
axios.defaults.headers.get['Accept'] ="application/vnd.sx.v1+json";
axios.defaults.headers.put['Content-Type'] ="application/x-www-form-urlencoded";
axios.defaults.headers.put['Accept'] ="application/vnd.sx.v1+json";
axios.defaults.headers.delete['Content-Type'] ="application/x-www-form-urlencoded";
axios.defaults.headers.delete['Accept'] ="application/vnd.sx.v1+json";
//
// const api = axios.create({
//     baseURL:Config.HTTP_BASE_URL,
//     timeout: Config.HTTP_DEFAULT_TIMEOUT + 2000, // 默认值再多加2秒
//     responseType: "json",
//     headers:{"Content-Type":"application/x-www-form-urlencoded"}
// });
/**
 *  @class HttpError
 */
export class HttpError extends ActionError{
    status:number;      //http状态码
    request?:any;
    response?:any;
    constructor(status:number,request?:any,response?:any){
        super(ErrorCode.HTTP_REQUEST_ERROR,getErrorMessage(ErrorCode.HTTP_REQUEST_ERROR));
        this.status = status;
        this.request = request;
        this.response = response;
    }
}
/**
 * @enum HttpMethod 支持的http请求类型
 */
export enum HttpMethod{
    GET     = "get",
    POST    = "post",
    PUT     = "put",
    DELETE  = "delete",
    HEAD    = "head",
    PATCH   = "patch",
}
/**
 * @class AxiosHttpError
 */
export class AxiosHttpError extends ActionError{
    code?:string;       //axios错误码
    request?:any;
    response?:any;
    constructor(message:string,code?:string,request?:any,response?:any){
        super(ErrorCode.AXIOS_HTTP_ERROR,message);
        this.request = request;
        this.response = response;
        this.code = code;
    }
}

/**
 * @class Api
 */
export default class Api{

    static handleRequest(promise:AxiosPromise<any>,external:boolean){
        return new Promise((resolve,reject)=>{
            promise.then((response)=>{
                    //console.log("handleRequest:url",response.request._url);
                    if(response.status >= 200 && response.status < 300){
                        // 数据不对的话
                        if(!response.data){
                            console.log("收到服务器数据解析失败:",response);
                            reject(new ActionError(ErrorCode.HTTP_RESPONSE_DATA_ERROR,getErrorMessage(ErrorCode.HTTP_RESPONSE_DATA_ERROR) || ""));
                            return;
                        }
                        let resData = <ResponseData<any>>{...response.data};
                        if(external){
                            // 外部接口
                            resolve(resData);
                            return;
                        }
                        if(!resData.ec){
                            // 成功
                            resolve(resData.em)
                        }else{
                            // 失败
                            reject(new ActionError(resData.ec,resData.ec && getErrorMessage(resData.ec,resData.em) || "",resData.em));
                        }
                    }else{
                        // 失败
                        reject(new HttpError(response.status,response.request,response));
                    }
                }).catch((error:AxiosError)=>{
                    if(error.response && error.response.status){
                        reject(new HttpError(error.response.status,error.response.request,error.response));
                    }else{
                        reject(new AxiosHttpError(error.message,error.code,error.request,error.response))
                    }
            })
        })
    }
    static requestWithAbsoluteUrl(method:string,url:string,params?:any,data?:any,config?:AxiosRequestConfig){
        return Api.handleRequest(axios({method,url,params,data,...config}),true);
    }
    static request(method:string,url:string,params?:any,data?:any,config?:AxiosRequestConfig){
        if(data){
            data =QueryString.stringify(data)
        }
        if(config)config = {...config,headers:{...axios.defaults.headers,...config.headers}};
        console.log("config",config);
        return Api.handleRequest(axios.request({method,url,params,data,...config}),false);
    }
    static get(url:string,params?:any){
        return Api.request(HttpMethod.GET,url,params);
    }

    static put(url:string,params?:any,data?:any){
        return Api.request(HttpMethod.PUT,url,params,data);
    }

    static post(url:string,params?:any,data?:any){
        return Api.request(HttpMethod.POST,url,params,data);
    }

    static delete(url:string,params?:any){
        return Api.request(HttpMethod.DELETE,url ,params);
    }

    static head(url:string,params?:any){
        return Api.request(HttpMethod.HEAD,url,params);
    }

    static patch(url:string,params?:any,data?:any){
        return Api.request(HttpMethod.PATCH,url,params,data);
    }
}
