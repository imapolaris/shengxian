"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Config_1 = require("../config/Config");
const EntitiesState_1 = require("../store/EntitiesState");
const acolor = Config_1.Config.ColorOf8; //激活
const uncolor = Config_1.Config.ColorBb2; //未激活
class PointLine extends React.Component {
    render() {
        let size = this.props.size ? this.props.size : { height: 1, width: 100 };
        let count = this.props.index ? this.props.index : 1;
        let id = this.props.id ? this.props.id : 1;
        let point_id = (id - 1) * 2 + 1;
        let line_id = id * 2;
        let point_color = count + 1 > point_id ? acolor : uncolor;
        point_color = this.props.first ? acolor : point_color;
        let line_color = count >= line_id ? acolor : uncolor;
        if (count - 1 == EntitiesState_1.OrderState.OSCancel) {
            point_color = acolor;
            line_color = acolor;
        }
        //
        // this.props = {
        //
        //     titles:[string],
        //     currentStatus:number
        // }
        console.log('current =' + this.props.currentStatus);
        return (React.createElement(react_native_1.View, { style: { paddingTop: 10, paddingBottom: 10 } },
            React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 } }, this.props.titles ? this.props.titles.map((item, key) => {
                return (React.createElement(react_native_1.View, { key: key, style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(react_native_1.View, { style: { borderRadius: 100, height: 10, width: 10, backgroundColor: key <= this.props.currentStatus ? acolor : uncolor } }),
                    (key === this.props.titles.length - 1) ? null
                        : React.createElement(react_native_1.View, { style: { height: 1, width: this.props.currentStatus != EntitiesState_1.OrderState.OSCancel ? ((this.props.width - 20) / this.props.titles.length) : this.props.width - 110, backgroundColor: key <= this.props.currentStatus ? acolor : uncolor } })));
            }) : null),
            React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row' } }, this.props.titles.map((item, key) => {
                return (React.createElement(react_native_1.View, { style: { width: (this.props.width / this.props.titles.length) }, key: key },
                    React.createElement(react_native_1.Text, { style: { color: key <= this.props.currentStatus ? point_color : uncolor,
                            textAlign: this.props.currentStatus != EntitiesState_1.OrderState.OSCancel ? 'center' : (key == 0 ? 'left' : 'right'),
                            marginLeft: this.props.currentStatus != EntitiesState_1.OrderState.OSCancel ? 0 : (key == 0 ? 30 : 0),
                            marginRight: this.props.currentStatus != EntitiesState_1.OrderState.OSCancel ? 0 : (key == 1 ? 30 : 0) } }, item)));
            }))));
        // return (
        //         <View style={{justifyContent: 'center', backgroundColor: Config.ColorW}}>
        //             <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        //                 {this.props.first ? <View style={{width: 20}} /> : null}
        //                 <View style={{borderRadius: 100, height: 10, width: 10, backgroundColor: point_color}}  />
        //                 {
        //                     this.props.endpoint ? null : <View style={{height: size.height, width: size.width, backgroundColor: line_color}}  />
        //                 }
        //             </View>
        //
        //             <View style={{marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
        //                 <Text style={{color: point_color}}>
        //                     {this.props.text}
        //                 </Text>
        //             </View>
        //         </View>
        //     );
    }
}
exports.default = PointLine;
//# sourceMappingURL=PointLine.js.map