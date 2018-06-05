/**
 * 模拟简单的map,所有的key都是number
 */
export interface NumberMap<ValType>{
    [key:number]:ValType
}

/**
 *模拟简单的map,所有的key都是string
 */
export interface StringMap<ValType>{
    [key:string]:ValType
}

/**
 * 版本号
 */
export interface Version{
    version:number
}