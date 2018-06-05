"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitiesState_1 = require("../../store/EntitiesState");
const moment = require("moment");
const Config_1 = require("../../config/Config");
/**
 * 格式化金钱,金钱全部是分为单位
 * @param {number} money 金钱
 */
function formatMoney(money) {
    return `${(money / 100).toFixed(2)}`;
}
exports.formatMoney = formatMoney;
function formatLeftCnt(cnt) {
    if (cnt > 10) {
        return "";
    }
    else if (cnt > 0) {
        return `库存${cnt}`;
    }
    else {
        return `已售罄`;
    }
}
exports.formatLeftCnt = formatLeftCnt;
function canAddToCart(item, dynamic, carts) {
    if (!dynamic || dynamic.leftcnt < 0) {
        Config_1.MyToast(2000, "库存不足");
        // Alert.alert("提示","库存不足");
        return false;
    }
    let cart = carts.find((cart) => cart.id == item.id);
    if (item.allow_place_type && cart && cart.count >= item.allow_place_type) {
        // Alert.alert("提示","购物车已添加数量超出限购数量");
        Config_1.MyToast(2000, "购物车已添加数量超出限购数量");
        return false;
    }
    if (cart && cart.count >= dynamic.leftcnt) {
        Config_1.MyToast(2000, "购物车已添加数量超出商品库存");
        // Alert.alert("提示","购物车已添加数量超出商品库存");
        return false;
    }
    return true;
}
exports.canAddToCart = canAddToCart;
function formatMoneyEx(money) {
    return `${(money / 100).toFixed(0)}`;
}
exports.formatMoneyEx = formatMoneyEx;
/**
 * 格式化时间
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}
exports.formatDate = formatDate;
// export const formatMoney = ( money:number, count = 2) => {
//     return `￥${money}`
// }
function getOrderStateName(sState) {
    switch (sState) {
        case EntitiesState_1.OrderState.OSUnPay: return '待支付';
        case EntitiesState_1.OrderState.OSPack: return '待拣货';
        case EntitiesState_1.OrderState.OSPeisoning: return '待配送';
        case EntitiesState_1.OrderState.OSFinish: return '已完成';
        case EntitiesState_1.OrderState.OSCancel: return '已取消';
        case EntitiesState_1.OrderState.OSCancelVerify: return '审核中';
    }
}
exports.getOrderStateName = getOrderStateName;
/**
 * @function template用来处理模版字符串:`a${id}`
 * @param {TemplateStringsArray} strings
 * @param keys
 * @returns {(...values: any[]) => string}
 */
exports.template = (strings, ...keys) => {
    return (...values) => {
        let dict = values[values.length - 1] || {};
        let result = [strings[0]];
        keys.forEach((key, i) => {
            let value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    };
};
//组合目录
exports.resolvePath = (...paths) => '/' + paths.join('/').split('/').filter(part => part && part !== '.').join('/');
function bytePower(bytes, power, precision = 5) {
    const num = Math.pow(1024, power);
    return (bytes / num).toPrecision(precision);
}
// 格式化字节显示
function fileSize(bytes) {
    const diff = 1024;
    // if it comes in the TB's
    if (bytes >= Math.pow(diff, 4))
        return `${bytePower(bytes, 4, 10)} TB`;
    // else it is in GB's
    else if (bytes >= Math.pow(diff, 3))
        return `${bytePower(bytes, 3)} GB`;
    // same as above
    else if (bytes >= Math.pow(diff, 2))
        return `${bytePower(bytes, 2)} MB`;
    // same too. here
    else if (bytes >= diff)
        return `${bytePower(bytes, 1)} KB`;
    // it is definately in bytes now
    else
        return `${bytes} Bytes`;
}
exports.fileSize = fileSize;
function checkPhone(phone) {
    return (/^1[34578]\d{9}$/.test(phone));
}
exports.checkPhone = checkPhone;
//# sourceMappingURL=funcs.js.map