export interface Tag{
    id:number
    name:string
}

const TAGS = <Tag[]>require("../../static/tags.json");
export default TAGS;