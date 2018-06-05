"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInterpolate(start, end, size) {
    function CreateBezierPoints(anchorpoints, pointsAmount) {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }
    function MultiPointBezier(points, t) {
        var len = points.length;
        var x = 0, y = 0;
        var erxiangshi = function (start, end) {
            var cs = 1, bcs = 1;
            while (end > 0) {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        };
        for (var i = 0; i < len; i++) {
            var point = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }
    let inputRange = [], outputRangeX = [], outputRangeY = [];
    let maxNum = 1;
    for (let i = 0; i < size - 1; i++) {
        inputRange[i] = maxNum * (i / (size - 1));
    }
    inputRange[size - 1] = maxNum;
    let result = CreateBezierPoints([start, { x: Math.max(end.y, start.y) / 2, y: Math.max(end.x, start.x) / 2 }, end], size - 1);
    result.push(Object.assign({}, end));
    result.forEach((d, i) => {
        outputRangeX[i] = d.x;
        outputRangeY[i] = d.y;
    });
    return { inputRange, outputRangeX, outputRangeY };
}
exports.getInterpolate = getInterpolate;
//# sourceMappingURL=animatedUtils.js.map