"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
exports.httpTimeout = (handle, request) => (action_1.createAction(ActionTypes.ACTION_HTTP_TIMEOUT, { handle, request }));
exports.httpError = (error) => (action_1.createAction(ActionTypes.ACTION_HTTP_ERROR, error));
//# sourceMappingURL=http.js.map