/**
 * 定位地址
 */
export interface PinLocation{
    name:string                 // 定位地址名称
    address:string              // 定位地址
    lat:number                  // 纬度
    lng:number                  // 经度
    city:string                 // 城市
}

/**
 * 不需要缓存,每次打开APP重新设置
 */
export interface TempUserState{
    shopId?:number,
    location?:PinLocation
}

/**
 * 当前用户状态
 */
export default interface CurrentUserState{
    token?:string
    logged?:boolean
    phone?:string
    msg_id?:string
    temp:TempUserState
}
export const initCurrentUserState:CurrentUserState={
    temp:{},
    logged:false,
}
