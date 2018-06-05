"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionTypes = require("../constants/ActionTypes");
const http_1 = require("../constants/http");
const action_1 = require("../common/utils/action");
const api_1 = require("../http/api");
const Config_1 = require("../config/Config");
const _ = require("lodash");
exports.fetchAddrList = (version, force) => (action_1.createAsyncRequestAction(ActionTypes.START_FETCH_ADDRLIST, {
    returnAction: ActionTypes.FINISH_FETCH_ADDRLIST,
    method: api_1.HttpMethod.GET,
    url: http_1.Url.ADDRLIST,
    params: {
        version
    },
    timeout: false,
    loading: true,
    handleError: false
}));
//新增
exports.addAddr = (addr) => (action_1.createAsyncRequestAction(ActionTypes.START_ADD_ADDR, {
    returnAction: ActionTypes.FINISH_ADD_ADDR,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.ADDRLIST,
    data: addr,
    timeout: false,
    loading: true,
    handleError: false
}));
//修改
exports.editAddr = (args) => (action_1.createAsyncRequestAction(ActionTypes.START_EDIT_ADDR, {
    returnAction: ActionTypes.FINISH_EDIT_ADDR,
    method: api_1.HttpMethod.PUT,
    url: http_1.Url.ADDR({ id: args.id }),
    data: args,
    timeout: false,
    loading: true,
    handleError: false
}));
exports.deleteAddr = (id) => (action_1.createAsyncRequestAction(ActionTypes.START_DELETE_ADDR, {
    returnAction: ActionTypes.FINISH_DELETE_ADDR,
    method: api_1.HttpMethod.DELETE,
    url: http_1.Url.ADDR({ id }),
    timeout: false,
    loading: true,
    handleError: false,
    extraData: { id } //保存一下删除的id
}));
/**
 * 批量删除
 * @param {number[]} ids
 * @returns {Action<AsyncRequest<any, any>>}
 */
exports.deleteAddrBatch = (ids) => (action_1.createAsyncRequestAction(ActionTypes.START_DELETE_ADDR, {
    returnAction: ActionTypes.FINISH_DELETE_ADDR,
    method: api_1.HttpMethod.DELETE,
    url: http_1.Url.ADDR({ id: _.join(ids, ",") }),
    timeout: false,
    loading: true,
    handleError: false,
}));
// 请求地址信息
exports.requestReGeoData = (coors) => {
    let location = "";
    for (let coor of coors) {
        if (location)
            location += "|";
        location += `${coor.longitude},${coor.latitude}`;
    }
    return action_1.createAsyncRequestAction(ActionTypes.START_SEARCHING_REGEO_DATA, {
        returnAction: ActionTypes.FINISH_SEARCHING_REGEO_DATA,
        method: api_1.HttpMethod.GET,
        url: Config_1.Config.HTTP_RE_GEO_URL({ location, key: Config_1.Config.HTTP_AMAP_WEB_KEY, batch: true }),
        timeout: false,
        loading: false,
        handleError: false,
        extraData: coors
    });
};
//# sourceMappingURL=addrlist.js.map