"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConstValue_1 = require("../../../common/constValue/ConstValue");
const Storage_1 = require("../../../common/utils/Storage");
/*获取购物车物品*/
exports.getAllItem = () => {
    let promise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            resolve(data);
        });
    });
    return promise;
};
/*更改物品数量*/
exports.changeBuyCount = (sectionIndex, itemIndex, count) => {
    let promise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            data[sectionIndex].item[itemIndex].usebuy = count;
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data).then();
            resolve(data);
        });
    });
    return promise;
};
/*更改物品是否选中*/
exports.changeItemCheck = (sectionIndex, itemIndex) => {
    let promise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            data[sectionIndex].item[itemIndex].isCheck = !data[sectionIndex].item[itemIndex].isCheck;
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data).then();
            resolve(data);
        });
    });
    return promise;
};
/*得到所有物品的总价格*/
exports.getAllPrice = () => {
    let pricePromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            let allPrice = 0.00;
            // 选中的item，价格 * 数量
            data.map((cartitem) => {
                if (cartitem.section.select) {
                    cartitem.item.map((item) => {
                        if (item.isCheck) {
                            allPrice = allPrice + item.usebuy * item.price;
                        }
                    });
                }
            });
            resolve(allPrice);
        });
    });
    return pricePromise;
};
/*修改section是否选中*/
exports.changeSectionCheck = (sectionIndex) => {
    let checkPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            // section 的选中状态改变，则section 的所有 item 的选中状态都要改变
            // 和section 的选中状态保持一致
            data[sectionIndex].section.select = !data[sectionIndex].section.select;
            data[sectionIndex].item.map((obj) => {
                obj.isCheck = data[sectionIndex].section.select;
            });
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data);
            resolve(data);
        });
    });
    return checkPromise;
};
/*所有的物品全部取消 选中 状态*/
exports.setAllItemDisCheck = () => {
    let disCheckPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            data.map((item) => {
                item.section.select = false;
                item.item.map((obj) => {
                    obj.isCheck = false;
                });
            });
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data);
            resolve(data);
        });
    });
    return disCheckPromise;
};
/*所有的物品全部 选中 状态*/
exports.setAllItemCheck = () => {
    let CheckPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            data.map((item) => {
                item.section.select = true;
                item.item.map((obj) => {
                    obj.isCheck = true;
                });
            });
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data);
            resolve(data);
        });
    });
    return CheckPromise;
};
/*删除所有选中的物品*/
exports.deleteAllItemCheck = () => {
    let delCheckPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            let i = data.length;
            while (i--) {
                if (data[i].section.select === true) {
                    data.splice(i, 1);
                }
            }
            data.map((obj) => {
                let i = obj.item.length;
                while (i--) {
                    if (obj.item[i].isCheck === true) {
                        obj.item.splice(i, 1);
                    }
                }
            });
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, data);
            resolve(data);
        });
    });
    return delCheckPromise;
};
/*根据物品ID，查询在购物车中的数量*/
exports.searchCountByIDFromCart = (itemID) => {
    let CheckPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            let count = 0;
            data.map((item) => {
                item.item.map((obj) => {
                    if (obj.id === itemID) {
                        count = obj.usebuy;
                    }
                });
            });
            resolve(count);
        });
    });
    return CheckPromise;
};
/*根据物品ID，添加到购物车*/
exports.addItemToCartByID = (sectionID, itemID, item, section) => {
    item.isCheck = true;
    let CheckPromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            let object = data;
            if (data) {
                let isHasSection = false;
                data.map((cartItem, index) => {
                    if (sectionID === cartItem.section.id) {
                        // 这个门店在购物车里面有物品
                        let isHasItem = false; // 标记购物车里面是否有该物品
                        cartItem.item.map((obj, i) => {
                            if (obj.id === itemID) {
                                // 物品已经在购物车里面存在,数量+1
                                object[index].item[i].usebuy = ++obj.usebuy;
                                isHasItem = true; // 有该物品，数量+1
                            }
                        });
                        // 没有该物品,将该物品添加到购物车
                        if (!isHasItem) {
                            object[index].item.push(item);
                        }
                        isHasSection = true;
                    }
                });
                // 购物车里面没有改门店的物品,将该门店（门店包含物品），添加到购物车
                if (!isHasSection) {
                    let newSection = { section: section, item: [item] };
                    object.push(newSection);
                }
            }
            else {
                object = [];
                // 购物车里面咩有数据
                let newSection = { section: section, item: [item] };
                object.push(newSection);
            }
            // 保存修改后的购物车数据到本地
            Storage_1.default.saveValueForKey(ConstValue_1.CartItemKey, object);
            console.log('购物车数据：', object);
            resolve(true);
        });
    });
    return CheckPromise;
};
/*判断购物车是否有选中的物品*/
exports.getSelectState = (data) => {
    let promise = new Promise((resolve, reject) => {
        let aaa = false;
        data.map((cartItem, index) => {
            if (cartItem.section.select) {
                aaa = true;
                return;
            }
            cartItem.item.map((obj, i) => {
                if (obj.isCheck) {
                    aaa = true;
                    return;
                }
            });
        });
        if (aaa)
            resolve(1);
        resolve(0);
    });
    return promise;
};
/*返回购物车是选中的物品的数量*/
exports.getSelectItemCount = () => {
    let pricePromise = new Promise((resolve, reject) => {
        Storage_1.default.getValueForKey(ConstValue_1.CartItemKey).then((data) => {
            let selectCount = 0;
            // 选中的item，价格 * 数量
            data.map((cartitem) => {
                cartitem.item.map((item) => {
                    if (item.isCheck) {
                        ++selectCount;
                    }
                });
            });
            resolve({ count: selectCount });
        });
    });
    return pricePromise;
};
//# sourceMappingURL=DataUtil.js.map