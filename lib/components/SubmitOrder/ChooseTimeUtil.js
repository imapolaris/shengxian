"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 左侧原数据
const moment = require("moment");
const _ = require("lodash");
const leftAllValue = [{ label: '今天', value: 'today' },
    { label: '明天', value: 'tomorrow' },
    { label: '后天', value: 'aftertomorrow' }
];
// 右侧原数据
const rightAllValue = [
    { label: '09:00-09:30', value: '0930' },
    { label: '09:30-10:00', value: '1000' },
    { label: '10:00-10:30', value: '1030' },
    { label: '10:30-11:00', value: '1100' },
    { label: '11:00-11:30', value: '1130' },
    { label: '11:30-12:00', value: '1200' },
    { label: '12:00-12:30', value: '1230' },
    { label: '12:30-13:00', value: '1300' },
    { label: '13:00-13:30', value: '1330' },
    { label: '13:30-14:00', value: '1400' },
    { label: '14:00-14:30', value: '1430' },
    { label: '14:30-15:00', value: '1500' },
    { label: '15:00-15:30', value: '1530' },
    { label: '15:30-16:00', value: '1600' },
    { label: '16:00-16:30', value: '1630' },
    { label: '16:30-17:00', value: '1700' },
    { label: '17:00-17:30', value: '1730' },
    { label: '17:30-18:00', value: '1800' },
    { label: '18:00-18:30', value: '1830' },
    { label: '18:30-19:00', value: '1900' },
    { label: '19:00-19:30', value: '1930' },
    { label: '19:30-20:00', value: '2000' },
    { label: '20:00-20:30', value: '2030' },
    { label: '20:30-21:00', value: '2100' },
    { label: '21:00-21:30', value: '2130' },
];
// 格式化数据
const GetDateStr = (day) => {
    return moment().add(day, "d").format("MM月-DD日");
};
//左侧显示的数据
exports.LeftData = () => {
    return leftAllValue.map((item, i) => {
        return item.label + '(' + GetDateStr(i) + ')';
    });
};
//右侧显示的数据
exports.RightData = (state) => {
    if (state === 'today') {
        let current = moment().add(30, "m").format("HHmm");
        console.log("current ", current);
        return rightAllValue.filter((item) => item.value > current).map((item) => item.label);
    }
    else {
        return rightAllValue.map((item, i) => item.label);
    }
};
// picker 数据
exports.PickData = () => {
    let left = exports.LeftData();
    let right = exports.RightData('today');
    let right1 = exports.RightData('not today');
    return left.reduce((data, i) => {
        if (i == left[0]) {
            //console.log("right::::", right);
            if (right && right.length > 0) {
                data.push({ [i]: right });
            }
        }
        else
            data.push({ [i]: right1 });
        return data;
    }, []);
};
function GetSelectedDate(left, right) {
    let add = 0;
    if (_.startsWith(left, "今天"))
        add = 0;
    else if (_.startsWith(left, "明天"))
        add = 1;
    else if (_.startsWith(left, "后天"))
        add = 2;
    let item = rightAllValue.find((item) => item.label == right);
    let mom = moment().add(add, "d");
    if (item) {
        let hour = _.parseInt(item.value.slice(0, 2));
        let minute = _.parseInt(item.value.slice(2));
        mom.hour(hour).minute(minute).second(0);
    }
    return mom.toDate();
}
exports.GetSelectedDate = GetSelectedDate;
function formartSelectedDate(date) {
    let now = moment();
    let dm = moment(date);
    let days = dm.dayOfYear() - now.dayOfYear();
    let right = rightAllValue.find((item) => item.value >= dm.format("HHmm"));
    return leftAllValue[days].label + '(' + GetDateStr(days) + ')' + ((right && right.label) || "");
}
exports.formartSelectedDate = formartSelectedDate;
function autoPeisongDate(date) {
    if (date != null) {
        let now = moment().add(30, "m");
        let old = moment(date);
        let sd = old.toDate();
        if (old.isAfter(now)) {
            return sd;
        }
    }
    return calcFirstPeisongDate();
}
exports.autoPeisongDate = autoPeisongDate;
function calcFirstPeisongDate() {
    let now = moment().add(30, "m");
    let right = rightAllValue.find((item) => item.value >= now.format("HHmm"));
    if (right) {
        let hour = _.parseInt(right.value.slice(0, 2));
        let minute = _.parseInt(right.value.slice(2));
        return now.hour(hour).minute(minute).second(0);
    }
    else {
        console.log("calcFirstPeisongDate next day");
        return now.add(1, 'day').hour(9).minute(30).second(0);
    }
}
exports.calcFirstPeisongDate = calcFirstPeisongDate;
//# sourceMappingURL=ChooseTimeUtil.js.map