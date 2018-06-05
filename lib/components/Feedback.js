"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const react_router_1 = require("react-router");
const ComHeader_1 = require("./ComHeader");
const MyStatusBar_1 = require("./MyStatusBar");
/*选择图片*/
const react_native_image_crop_picker_1 = require("react-native-image-crop-picker");
const funcs_1 = require("../common/utils/funcs");
const Config_1 = require("../config/Config");
const ComHeaderWithRouter = react_router_1.withRouter(ComHeader_1.ComHeader);
const maxTextLength = 500;
const { width, height } = react_native_1.Dimensions.get('window');
const screenWidth = react_native_1.Dimensions.get('window').width;
const maxImageCount = 5;
const imageSize = { width: 80, height: 80 };
const options = {
    title: '选择图片',
    storageOptions: {
        skipBackup: true,
        path: 'shenxianImage'
    }
};
class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feed_text: '',
            images: [],
            imgdata: [],
            phone: '',
            selectCount: 100,
            showBgView: false
        };
        this.showImagePicker = this.showImagePicker.bind(this);
        this.chooseCamera = this.chooseCamera.bind(this);
        this.choosePhone = this.choosePhone.bind(this);
        this.enterImage = this.enterImage.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.isAble = this.isAble.bind(this);
    }
    /*显示图片弹框*/
    showImagePicker() {
        // ImagePicker.showImagePicker(options, (response:any) => {
        //
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     }
        //     else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     }
        //     else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     }
        //     else {
        //
        //         if (this.state.selectCount === 100){
        //             let arr = [];
        //             arr.push(response.uri);
        //             let newData = this.state.images.concat(arr);
        //
        //             this.setState({
        //                 images: newData
        //             })
        //         }else {
        //             let newData = this.state.images;
        //             newData.splice(this.state.selectCount,1, response.uri);
        //
        //             this.setState({
        //                 images: newData
        //             })
        //         }
        //     }
        // });
    }
    /*相机*/
    chooseCamera() {
        this.dismissAlert();
        react_native_image_crop_picker_1.default.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '正在处理...'
        }).then((image) => {
            console.log('相机图片路径：' + image.path + " data: " + image.data);
            this.enterImage(image);
        });
    }
    /*相册*/
    choosePhone() {
        this.dismissAlert();
        react_native_image_crop_picker_1.default.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '正在处理...'
        }).then((image) => {
            console.log('相机图片路径：' + image.path + " data: " + image.data);
            this.enterImage(image);
        });
    }
    /*将图片加入数组并显示*/
    enterImage(image) {
        console.log('this.state.selectCount===', this.state.selectCount);
        if (this.state.selectCount === 100) {
            let arr = [];
            arr.push(image.path);
            let newData = this.state.images.concat(arr);
            let arr2 = [];
            arr2.push(image.data);
            let img = this.state.imgdata.concat(arr2);
            this.setState({
                images: newData,
                imgdata: img,
            });
        }
        else {
            let newData = this.state.images;
            newData.splice(this.state.selectCount, 1, image.path);
            this.setState({
                images: newData,
            });
        }
    }
    /*弹框消失*/
    dismissAlert() {
        this.setState({
            showBgView: false
        });
    }
    isPhoneValid(phone) {
        return funcs_1.checkPhone(phone);
    }
    isAble() {
        if (!this.isPhoneValid(this.state.phone)) {
            return false;
        }
        if (this.state.feed_text.length == 0) {
            return false;
        }
        return true;
    }
    onFeedback() {
        let feed_text = this.state.feed_text;
        let images = this.state.imgdata;
        let phone = this.state.phone;
        if (feed_text == "") {
            Config_1.MyToast(3000, "请输入反馈内容！！");
            return;
        }
        if (this.isPhoneValid(phone)) {
            this.props.feedback({ feed_text, images, phone });
        }
        else {
            Config_1.MyToast(3000, "请输入正确手机号！！");
            return;
        }
        //this.props.history.push(FEEDBACK);
        this.props.history.goBack();
        Config_1.MyToast(3000, "提交成功！！");
    }
    componentDidMount() {
        //this.subscription = DeviceEventEmitter.addListener('Test', ()=>alert('事件通知'));
    }
    componentWillUnmount() {
        //this.subscription.remove();
    }
    render() {
        return (React.createElement(react_native_1.KeyboardAvoidingView, { behavior: 'height', keyboardVerticalOffset: -300 },
            React.createElement(react_native_1.ScrollView, null,
                React.createElement(native_base_1.View, { style: { flex: 1 } },
                    React.createElement(native_base_1.Container, null,
                        React.createElement(MyStatusBar_1.default, null),
                        React.createElement(ComHeaderWithRouter, { title: "\u610F\u89C1\u53CD\u9988" }),
                        React.createElement(native_base_1.Content, { style: { backgroundColor: 'white', flex: 1 } },
                            React.createElement(native_base_1.View, { style: { margin: 5, padding: 5 } },
                                React.createElement(native_base_1.Input, { style: styles.textInputStyle, placeholder: '\u6211\u4EEC\u4F1A\u8BA4\u771F\u542C\u53D6\u60A8\u7684\u5EFA\u8BAE\u6216\u610F\u89C1\uFF0C\u60A8\u60F3\u8BF4\u4EC0\u4E48\u90FD\u53EF\u4EE5', onChangeText: (feed_text) => {
                                        if (feed_text.length >= maxTextLength) {
                                            this.setState({
                                                feed_text: feed_text.substr(0, maxTextLength)
                                            });
                                        }
                                        else
                                            this.setState({ feed_text });
                                    }, value: this.state.feed_text, underlineColorAndroid: 'transparent', multiline: true })),
                            React.createElement(native_base_1.View, { style: { flexDirection: 'row', marginVertical: 10, flexWrap: 'wrap' } },
                                this.state.images.map((item, i) => {
                                    return (React.createElement(native_base_1.View, { style: { marginLeft: 10, marginTop: 5 }, key: i },
                                        React.createElement(react_native_1.TouchableOpacity, { key: i, onPress: () => {
                                                this.setState({
                                                    selectCount: i,
                                                    showBgView: true
                                                });
                                            } },
                                            React.createElement(react_native_1.Image, { key: i, resizeMode: 'cover', style: { width: imageSize.width, height: imageSize.height }, source: { uri: item } }))));
                                }),
                                this.state.images.length < maxImageCount ? React.createElement(react_native_1.TouchableOpacity, { style: { marginLeft: 10, marginTop: 5 }, onPress: () => {
                                        this.setState({
                                            showBgView: true,
                                            selectCount: 100
                                        });
                                    } },
                                    React.createElement(native_base_1.View, { style: styles.chooseViewStyle },
                                        React.createElement(native_base_1.Icon, { style: { fontSize: 17 }, name: 'add' }),
                                        React.createElement(native_base_1.Text, { style: { fontSize: 12, color: '#383838' } }, "\u4E0A\u4F20\u56FE\u7247"))) : null),
                            React.createElement(native_base_1.View, { style: { height: 10, backgroundColor: Config_1.Config.ColorBf4 } }),
                            React.createElement(native_base_1.View, { style: { flexDirection: 'row', alignItems: 'center', backgroundColor: Config_1.Config.ColorBf4, marginTop: 10 } },
                                React.createElement(native_base_1.Text, { style: styles.textStyle }, "\u8054\u7CFB\u7535\u8BDD"),
                                React.createElement(native_base_1.Input, { keyboardType: "numeric", style: styles.inputStyle, placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801", onChangeText: (phone) => {
                                        this.setState({ phone });
                                    }, value: this.state.phone }))),
                        React.createElement(native_base_1.View, { style: { height: Config_1.Config.BtnComHeight, position: 'absolute', bottom: Config_1.px2dp(220), width: screenWidth - 20, marginLeft: 10 } },
                            React.createElement(react_native_1.TouchableOpacity, { disabled: !this.isAble(), style: { backgroundColor: this.isAble() ? Config_1.Config.ColorOff : Config_1.Config.ColorBf2, flex: 1,
                                    alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: this.isAble() ? Config_1.Config.ColorOff : Config_1.Config.ColorBf2
                                }, onPress: () => { this.onFeedback(); } },
                                React.createElement(native_base_1.Text, { style: { color: this.isAble() ? Config_1.Config.ColorW : Config_1.Config.ColorB999 } }, "\u63D0\u4EA4"))),
                        this.state.showBgView ? React.createElement(react_native_1.TouchableOpacity, { style: {
                                backgroundColor: 'black',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                opacity: 0.5,
                                width,
                                height
                            }, onPress: () => {
                                this.dismissAlert();
                            } }) : null,
                        this.state.showBgView ? React.createElement(native_base_1.View, { style: {
                                backgroundColor: 'white',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width,
                                height: this.state.selectCount !== 100 ? 172 + 41 : 172
                            } },
                            React.createElement(native_base_1.View, { style: styles.bottomViewStyle },
                                React.createElement(native_base_1.Text, { style: { fontSize: 14 } }, "\u9009\u62E9\u7167\u7247")),
                            React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3' } }),
                            React.createElement(react_native_1.TouchableOpacity, { style: styles.bottomViewStyle, onPress: this.chooseCamera },
                                React.createElement(native_base_1.Text, { style: { fontSize: 17, color: '#0772E8' } }, "\u76F8\u673A")),
                            React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3' } }),
                            React.createElement(react_native_1.TouchableOpacity, { style: styles.bottomViewStyle, onPress: this.choosePhone },
                                React.createElement(native_base_1.Text, { style: { fontSize: 17, color: '#0772E8' } }, "\u76F8\u518C")),
                            this.state.selectCount !== 100 ? React.createElement(native_base_1.View, null,
                                React.createElement(native_base_1.View, { style: { height: 1, backgroundColor: '#f3f3f3' } }),
                                React.createElement(react_native_1.TouchableOpacity, { style: styles.bottomViewStyle, onPress: () => {
                                        let newData = this.state.images;
                                        newData.splice(this.state.selectCount, 1);
                                        this.setState({
                                            images: newData,
                                        });
                                        this.dismissAlert();
                                    } },
                                    React.createElement(native_base_1.Text, { style: { fontSize: 17, color: '#0772E8' } }, "\u5220\u9664"))) : null,
                            React.createElement(native_base_1.View, { style: { height: 10, backgroundColor: '#f3f3f3' } }),
                            React.createElement(react_native_1.TouchableOpacity, { style: styles.bottomViewStyle, onPress: () => {
                                    this.dismissAlert();
                                } },
                                React.createElement(native_base_1.Text, { style: { fontSize: 17, color: '#0772E8' } }, "\u53D6\u6D88"))) : null)))));
    }
}
exports.default = Feedback;
const styles = react_native_1.StyleSheet.create({
    inputStyle: { marginLeft: 10, fontSize: 14, width: 200 },
    textStyle: { fontWeight: 'bold', fontSize: 14, marginLeft: 10 },
    bottomViewStyle: { alignItems: 'center', height: 40, justifyContent: 'center' },
    chooseViewStyle: { width: imageSize.width, height: imageSize.height, backgroundColor: Config_1.Config.ColorBf4, justifyContent: 'center', alignItems: 'center' },
    textInputStyle: Object.assign({ backgroundColor: Config_1.Config.ColorBf4, fontSize: 12 }, react_native_1.Platform.select({
        ios: {
            height: 200,
        },
    })),
});
//# sourceMappingURL=Feedback.js.map