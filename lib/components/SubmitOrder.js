"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const moment = require("moment");
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const native_base_2 = require("native-base");
const react_router_1 = require("react-router");
const react_native_picker_1 = require("react-native-picker");
const ChooseTimeUtil_1 = require("./SubmitOrder/ChooseTimeUtil");
const OrderAddressItem_1 = require("./SubmitOrder/OrderAddressItem");
const OrderLineItem_1 = require("./SubmitOrder/OrderLineItem");
const OrderItemInfo_1 = require("./SubmitOrder/OrderItemInfo");
const OrderItemSubInfo_1 = require("./SubmitOrder/OrderItemSubInfo");
const OrderRemainItem_1 = require("./SubmitOrder/OrderRemainItem");
const OrderBottomItem_1 = require("./SubmitOrder/OrderBottomItem");
const RouterDefine_1 = require("../constants/RouterDefine");
const MyStatusBar_1 = require("./MyStatusBar");
const _ = require("lodash");
const ComHeader_1 = require("./ComHeader");
const Config_1 = require("../config/Config");
const distance_1 = require("../common/utils/distance");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const { width, height } = react_native_1.Dimensions.get('window');
// import {Util} from "../common/utils/util";
const pichead = { uri: "screen" };
exports.shead = react_native_1.StyleSheet.create({
    head: { backgroundColor: "#fff", height: 80 },
    body: { justifyContent: "center", flexDirection: "row" },
    fonttxt: { color: '#000', fontSize: 20 },
    fonticon: { color: '#000', fontSize: 40 },
});
//f4f4f4
exports.saddr = react_native_1.StyleSheet.create({
    bk: { backgroundColor: 'gainsboro' },
    fontright: { flexDirection: 'row', justifyContent: 'flex-end' },
});
class SubmitOrder extends React.Component {
    constructor(props) {
        super(props);
        this.props.ui.memo = ""; //新打开页面需要清空
        props.ui.time = ChooseTimeUtil_1.autoPeisongDate(props.ui.time);
        let allPrice = this.calcPrice();
        this.state = {
            isShowTime: false,
            selectTime: ChooseTimeUtil_1.formartSelectedDate(props.ui.time),
            showBgView: false,
            allPrice,
            coupon: this.getValidCoupon(allPrice)
        };
        this.showPick = this.showPick.bind(this);
        this.calcPrice = this.calcPrice.bind(this);
        this.getValidCouponCount = this.getValidCouponCount.bind(this);
        this.getTotalMoney = this.getTotalMoney.bind(this);
        this.commitOrder = this.commitOrder.bind(this);
        this.getValidCoupon = this.getValidCoupon.bind(this);
        this.props.location.state.from = ''; //只用一次 用了删除了
    }
    componentWillReceiveProps(nextProps) {
        let allPrice = this.calcPrice();
        this.setState({ selectTime: ChooseTimeUtil_1.formartSelectedDate(nextProps.ui.time), allPrice, coupon: this.getValidCoupon(allPrice) });
    }
    getItemDynamic(id) {
        return this.props.itemDynamics.data.find((item) => item.id == id);
    }
    calcPrice() {
        let { items } = this.props.ui;
        let allPrice = _.reduce(items, (sum, item) => {
            let dynamic = this.getItemDynamic(item.item_id);
            let price = dynamic ? dynamic.price : 10000;
            return sum + item.itemcnt * price;
        }, 0);
        return allPrice;
    }
    getValidCoupon(all) {
        if (this.props.location.state.from != RouterDefine_1.MAIN_CART) {
            let { coupon } = this.props.ui;
            if (coupon && moment().isBefore(coupon.endtime) && coupon.lowmoney <= all) {
                return coupon;
            }
        }
        let auto = _.filter(this.props.coupons, (c) => {
            console.log(c);
            return moment().isBefore(c.endtime) && c.lowmoney <= all;
        })
            .reduce((r, c) => {
            if (!r) {
                return c;
            }
            else if (c.money > r.money) {
                return c;
            }
            return r;
        }, undefined);
        this.props.ui.coupon = auto; //记录选择
        return auto;
    }
    getValidCouponCount(all) {
        return _.reduce(this.props.coupons, (cnt, coupon) => {
            if (coupon.lowmoney <= all) {
                return cnt + 1;
            }
            return cnt;
        }, 0);
    }
    commitOrder() {
        let { items, addr, time, memo, coupon } = this.props.ui;
        if (!addr || !addr.id) {
            Config_1.MyToast(3000, "请选择配送地址");
            // Toast.show({
            //     text:`请选择配送地址`,
            //     buttonText:"确定",
            //     position:"bottom",
            //     type:"danger",
            //     duration:3000
            // });
            return;
        }
        let dis = distance_1.getDistance(addr.lat, addr.lng, Config_1.Config.SHOP_LOCATION.lat, Config_1.Config.SHOP_LOCATION.lng);
        if (dis > Config_1.Config.MAX_PEISONG_DISTANCE) {
            native_base_1.Toast.show({
                text: "超出配送距离",
                buttonText: "确定",
                position: "bottom",
                type: "danger",
                duration: 5000
            });
            return;
        }
        let ids = _.map(items, (item) => item.item_id);
        let order = {
            itemlist: ids,
            addr_id: addr.id,
            apptime: moment(time).format("YYYY-MM-DD HH:mm:ss"),
            coupon_id: coupon ? coupon.id : 0,
            des: memo
        };
        this.props.newOrder(order);
    }
    getTotalMoney() {
        let { coupon } = this.state;
        let couponMoney = 0;
        if (coupon && coupon.id > 0 && coupon.lowmoney < this.state.allPrice) {
            couponMoney = -coupon.money;
        }
        let peisong = Config_1.Config.PEISONGRMB;
        if (this.state.allPrice >= Config_1.Config.NOPEISONGRMBMIN) {
            peisong = 0;
        }
        let total = this.state.allPrice + couponMoney + peisong;
        return (total > 0) ? total : 0;
    }
    showPick() {
        let data = ChooseTimeUtil_1.PickData();
        console.log(data);
        react_native_picker_1.default.init({
            pickerData: ChooseTimeUtil_1.PickData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 17,
            pickerFontColor: [0, 0, 0, 1],
            pickerBg: [255, 255, 255, 1],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择送达时间',
            pickerConfirmBtnColor: [0, 121, 251, 1],
            pickerCancelBtnColor: [137, 137, 137, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [238, 238, 239, 1],
            onPickerConfirm: data => {
                this.props.setSubmitOrderTime(ChooseTimeUtil_1.GetSelectedDate(data[0], data[1]));
                this.setState({
                    showBgView: false
                });
            },
            onPickerCancel: data => {
                this.setState({
                    showBgView: false
                });
            },
            onPickerSelect: data => {
                this.setState({
                    showBgView: false
                });
            }
        });
        react_native_picker_1.default.show();
    }
    render() {
        return (React.createElement(native_base_2.Container, null,
            React.createElement(MyStatusBar_1.default, null),
            React.createElement(ComHeaderWithRouter, { title: "\u63D0\u4EA4\u8BA2\u5355" }),
            React.createElement(native_base_2.Content, { ref: 'scrollView' },
                React.createElement(OrderLineItem_1.default, { height: 10 }),
                React.createElement(OrderAddressItem_1.default, { addr: this.props.ui.addr, addressClick: () => { this.props.history.push(RouterDefine_1.ADDRLIST, { from: RouterDefine_1.SUBMITORDER }); } }),
                React.createElement(OrderLineItem_1.default, { height: 10 }),
                React.createElement(OrderItemInfo_1.default, { order: this.props.ui.items, allprice: this.state.allPrice, selectTime: this.state.selectTime, timeClick: () => {
                        this.showPick();
                        this.setState({
                            showBgView: true
                        });
                    } }),
                React.createElement(OrderItemSubInfo_1.default, { coupon: this.state.coupon, couponCount: this.getValidCouponCount(this.state.allPrice), allprice: this.state.allPrice, switchClick: (check) => { }, CouponClick: () => { this.props.history.push(RouterDefine_1.COUPON, { from: RouterDefine_1.SUBMITORDER, all: this.state.allPrice }); } }),
                React.createElement(OrderLineItem_1.default, { height: 10 }),
                React.createElement(OrderRemainItem_1.default, { onFocus: () => { }, changeText: (text) => { this.props.setSubmitOrderMemo(text); }, memo: this.props.ui.memo })),
            React.createElement(OrderBottomItem_1.default, { real: this.getTotalMoney(), commitOrderClick: () => {
                    this.commitOrder();
                } }),
            this.state.showBgView ? React.createElement(react_native_1.TouchableOpacity, { style: {
                    backgroundColor: 'black',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0.5,
                    width,
                    height
                }, onPress: () => {
                    react_native_picker_1.default.hide();
                    this.setState({
                        showBgView: false
                    });
                } }) : null));
    }
}
exports.default = SubmitOrder;
//# sourceMappingURL=SubmitOrder.js.map