declare module "react-native-permissions"{
    export type CheckOptions =string |{type:string}
    export type Rationale = { title: string, message: string }
    export type RequestOptions=string | { type: string, rationale?: Rationale }
    export type Status='authorized' | 'denied' | 'restricted' | 'undetermined'

    export interface ReactNativePermissions{
        canOpenSettings:()=>Promise<boolean>,
        openSettings:()=>Promise<any>,
        getTypes:()=>string[],
        check:(permission:string,options?:CheckOptions)=>Promise<Status>,
        request:(permission:string,options?:RequestOptions)=>Promise<Status>,
        checkMultiple:(permissions: Array<string>)=>Promise<{ [key:string]: string }>,
    }
    const Permissions:ReactNativePermissions;
    export default Permissions
}


