"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 合并多个reducer为一个
 * @param {Reducer<any>} reducers 要合并的reducer
 * @returns {(state: any, action: AnyAction) => Reducer<any>} 合并后的新reducer
 */
exports.reduceReducers = (...reducers) => {
    return (state, action) => reducers.reduce((state, r) => r(state, action), state);
};
//# sourceMappingURL=reducer.js.map