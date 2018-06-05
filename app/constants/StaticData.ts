export interface Province{
    id:number
    name:string
}

export interface City{
    id:number,
    name:string,
    province:number,
}
export interface District{
    id:number,
    name:string,
    city:number
}
