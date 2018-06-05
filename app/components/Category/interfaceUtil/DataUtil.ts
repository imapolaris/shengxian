const CategoryLeftData = require('../../../../test_data/t_category.json');
const AllItemData = require('../../../../test_data/t_item.json');

import { Item } from "../../../store/EntitiesState";

/*分类左侧数据模型*/
export interface leftItemModel {
    id : number,
    parent_id : number,
    title : string,
    avatar : string,
    is_valid : number,
    icon : string,
    order : number,
    created_at : string,
    updated_at : string,
    is_Select: number, // 用于判断是否选中
    list:Item[]
}

/*返回分类左侧数据*/
export const leftItemDataModel = (selectIndex: number)=>{
    const modelArr:Array<leftItemModel> = CategoryLeftData;

    selectIndex = selectIndex === undefined ? 0 : selectIndex

    const afterArr = modelArr.map((item, i)=>{
        let itemNew: leftItemModel = item;
        itemNew.list = getAllItemWithCategoryID(itemNew.id)
        i === selectIndex ? itemNew.is_Select = 1 : itemNew.is_Select = 0;
        return itemNew
    });

    // console.log('asdsdasds +' + JSON.stringify(itemNew))
    return afterArr;
};


/*返回分类第一条分类的ID*/
export const getFirstCategoryID = ()=>{
    const modelArr:Array<leftItemModel> = CategoryLeftData;

    return modelArr[0].id;
};

/*返回分类某一条分类的ID*/
export const getCategoryID = (index: number)=>{

    index = index === undefined ? 0 : index

    const modelArr:Array<leftItemModel> = CategoryLeftData;

    return modelArr[index].id;
};

/*根据分类ID 得到分类下的所有物品*/
export const getAllItemWithCategoryID = (categoryID: number)=>{
    let data: Array<Item>=[];
    AllItemData.map((item: Item)=>{
        item.item_category_id === categoryID ? data.push(item) : null;
    });

    console.log('getAllItemdata' + data +',' + categoryID)

    return data;
};

/*根据关键词查找所有物品*/
export const searchItem = (keywords: string)=>{
    let data: Array<Item>=[];
    AllItemData.map((item: Item)=>{
        item.title.includes(keywords) ? data.push(item) : null;
    });

    return data;
};