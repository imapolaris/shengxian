"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
const api_1 = require("../http/api");
const http_1 = require("../constants/http");
exports.feedback = (args) => (action_1.createAsyncRequestAction(ActionTypes.START_FEED_BACK, {
    returnAction: ActionTypes.FINISH_FEED_BACK,
    method: api_1.HttpMethod.POST,
    url: http_1.Url.FEEDBACK,
    data: args,
    timeout: false,
    loading: true,
    handleError: false
}));
//# sourceMappingURL=feedback.js.map