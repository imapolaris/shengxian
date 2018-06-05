declare module 'react-native-alipay' {
    export function pay(orderInfo:string,showLoading:boolean):Promise<any>;
}