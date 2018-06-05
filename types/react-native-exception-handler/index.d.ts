declare module "react-native-exception-handler"{
    export type JsHandler =(err:any,fatal:boolean)=>any;
    export type NativeHandler =(err:string)=>any;
    export interface ExceptionHandler{
        setJSExceptionHandler:(handler:JsHandler,validInDevMode:boolean)=>any
        getJSExceptionHandler:()=>JsHandler
        setNativeExceptionHandler:(handler:NativeHandler)=>void
    }
    const handler:ExceptionHandler;
    export default handler
}