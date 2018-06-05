"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const index_1 = require("../styles/index");
const react_native_swiper_1 = require("react-native-swiper");
//介绍图片,在drawerbal目录
const intros = [{ uri: 'intro1' }, { uri: 'intro2' }, { uri: 'intro3' }, { uri: 'intro4' }];
class IntroSwiper extends React.Component {
    render() {
        let { width, height } = this.props;
        return (React.createElement(react_native_swiper_1.default, { showsButtons: false, showsHorizontalScrollIndicator: true, loop: false }, intros.map((item, i) => (React.createElement(react_native_1.View, { style: index_1.default.swiperSlide, key: i }, (i === intros.length) ?
            (React.createElement(react_native_1.Image, { source: item, style: [index_1.default.swiperImage, { width, height }] })) :
            (React.createElement(react_native_1.TouchableHighlight, { onPress: this.props.onEndPress, style: { flex: 1 } },
                React.createElement(react_native_1.Image, { source: item, style: [index_1.default.swiperImage, { width, height }] }))))))));
    }
}
exports.default = IntroSwiper;
//# sourceMappingURL=IntroSwiper.js.map