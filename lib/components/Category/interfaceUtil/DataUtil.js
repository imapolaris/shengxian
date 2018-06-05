"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryLeftData = require('../../../../test_data/t_category.json');
const AllItemData = require('../../../../test_data/t_item.json');
/*返回分类左侧数据*/
exports.leftItemDataModel = (selectIndex) => {
    const modelArr = CategoryLeftData;
    selectIndex = selectIndex === undefined ? 0 : selectIndex;
    const afterArr = modelArr.map((item, i) => {
        let itemNew = item;
        itemNew.list = exports.getAllItemWithCategoryID(itemNew.id);
        i === selectIndex ? itemNew.is_Select = 1 : itemNew.is_Select = 0;
        return itemNew;
    });
    // console.log('asdsdasds +' + JSON.stringify(itemNew))
    return afterArr;
};
/*返回分类第一条分类的ID*/
exports.getFirstCategoryID = () => {
    const modelArr = CategoryLeftData;
    return modelArr[0].id;
};
/*返回分类某一条分类的ID*/
exports.getCategoryID = (index) => {
    index = index === undefined ? 0 : index;
    const modelArr = CategoryLeftData;
    return modelArr[index].id;
};
/*根据分类ID 得到分类下的所有物品*/
exports.getAllItemWithCategoryID = (categoryID) => {
    let data = [];
    AllItemData.map((item) => {
        item.item_category_id === categoryID ? data.push(item) : null;
    });
    console.log('getAllItemdata' + data + ',' + categoryID);
    return data;
};
/*根据关键词查找所有物品*/
exports.searchItem = (keywords) => {
    let data = [];
    AllItemData.map((item) => {
        item.title.includes(keywords) ? data.push(item) : null;
    });
    return data;
};
//# sourceMappingURL=DataUtil.js.map