"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EARTH_RADIUS = 6378.137; //地球半径,单位千米
function rad(d) {
    return d * Math.PI / 180.0;
}
/**
 *
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} 两个经纬度之间的距离,单位千米
 */
function getDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = rad(lat1);
    let radLat2 = rad(lat2);
    let a = radLat1 - radLat2;
    let b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return parseFloat(s.toFixed(2));
}
exports.getDistance = getDistance;
//# sourceMappingURL=distance.js.map