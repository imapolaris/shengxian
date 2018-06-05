"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../common/utils/action");
const ActionTypes = require("../constants/ActionTypes");
exports.updateLocation = (item) => (action_1.createAction(ActionTypes.LOCATION_UPDATE, item));
exports.startGpsLocation = () => (action_1.createAction(ActionTypes.START_GPS_LOCATION));
exports.changeShop = (id) => (action_1.createAction(ActionTypes.CHANGE_SHOP, id));
//# sourceMappingURL=location.js.map