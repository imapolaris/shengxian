import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, Platform, DeviceEventEmitter, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
    Container, Header, Content, Left, Body, Right, Title, Text, Form, Item, Label, Input, Button, Thumbnail, Icon, CardItem, Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List
} from 'native-base';

import { RouteComponentProps, withRouter } from "react-router";
import { ComHeader, ComHeaderBtn } from "./ComHeader";
import MyStatusBar from "./MyStatusBar";
import { FEEDBACK } from "../constants/RouterDefine";
/*选择图片*/
import ImageCropPicker from 'react-native-image-crop-picker';

import PlaySound from 'react-native-sound';
import { AudioRecorder } from 'react-native-audio'
import Close from '../../images/feedback_close.png'
import * as ConstValue from "../constants/iOSScreenAuto";
import { FeedbackData } from '../actions/feedback';
import { checkPhone } from "../common/utils/funcs";
import { Config, MyToast, px2dp } from "../config/Config";
const ComHeaderWithRouter = withRouter(ComHeader);

const maxTextLength = 500;
const { width, height } = Dimensions.get('window');


const screenWidth = Dimensions.get('window').width;
const maxImageCount = 5;
const imageSize = { width: 80, height: 80 };

const options = {
    title: '选择图片',
    storageOptions: {
        skipBackup: true,
        path: 'shenxianImage'
    }
};

export interface FeedbackProps extends RouteComponentProps<any> {
    feedback: (data: FeedbackData) => any
}

export interface FeedbackState {
    feed_text: string,
    images: Array<string>,
    imgdata: Array<string>,
    phone: string,
    selectCount: number,
    showBgView: boolean,
}
export default class Feedback extends React.Component<FeedbackProps, FeedbackState>{
    constructor(props: any) {
        super(props);

        this.state = {
            feed_text: '',
            images: [],
            imgdata: [],
            phone: '',
            selectCount: 100, // 默认不是
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
        ImageCropPicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '正在处理...'
        }).then((image: any) => {
            console.log('相机图片路径：' + image.path + " data: " + image.data);
            this.enterImage(image);
        });
    }
    /*相册*/
    choosePhone() {
        this.dismissAlert();
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '正在处理...'
        }).then((image: any) => {
            console.log('相机图片路径：' + image.path + " data: " + image.data);
            this.enterImage(image);
        });

    }
    /*将图片加入数组并显示*/
    enterImage(image: any) {

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
            })
        } else {
            let newData = this.state.images;
            newData.splice(this.state.selectCount, 1, image.path);

            this.setState({
                images: newData,
            })
        }
    }
    /*弹框消失*/
    dismissAlert() {
        this.setState({
            showBgView: false
        })
    }
    isPhoneValid(phone: string) {
        return checkPhone(phone);
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
            MyToast(3000, "请输入反馈内容！！");
            return;
        }

        if (this.isPhoneValid(phone)) {
            this.props.feedback({ feed_text, images, phone });
        }
        else {
            MyToast(3000, "请输入正确手机号！！");
            return;
        }

        //this.props.history.push(FEEDBACK);
        this.props.history.goBack();
        MyToast(3000, "提交成功！！");
    }
    componentDidMount() {
        //this.subscription = DeviceEventEmitter.addListener('Test', ()=>alert('事件通知'));
    }
    componentWillUnmount() {
        //this.subscription.remove();
    }
    render() {
        return (
            <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={-300}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Container>
                            <MyStatusBar />
                            <ComHeaderWithRouter title="意见反馈" />

                            <Content style={{ backgroundColor: 'white', flex: 1 }}>
                                <View style={{ margin: 5, padding: 5 }}>
                                    <Input style={styles.textInputStyle}
                                        placeholder='我们会认真听取您的建议或意见，您想说什么都可以'
                                        onChangeText={(feed_text) => {
                                            if (feed_text.length >= maxTextLength) {
                                                this.setState({
                                                    feed_text: feed_text.substr(0, maxTextLength)
                                                });
                                            } else
                                                this.setState({ feed_text });
                                        }}
                                        value={this.state.feed_text}
                                        underlineColorAndroid='transparent'
                                        multiline={true}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 10, flexWrap: 'wrap' }}>
                                    {
                                        this.state.images.map((item, i) => {
                                            return (
                                                <View style={{ marginLeft: 10, marginTop: 5 }} key={i}>
                                                    <TouchableOpacity key={i} onPress={() => {

                                                        this.setState({
                                                            selectCount: i, // 更换第i张图片
                                                            showBgView: true
                                                        })
                                                    }}>
                                                        <Image key={i} resizeMode='cover' style={{ width: imageSize.width, height: imageSize.height }}
                                                            source={{ uri: item }}
                                                        />
                                                    </TouchableOpacity>

                                                </View>
                                            )
                                        })
                                    }

                                    {
                                        this.state.images.length < maxImageCount ? <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}
                                            onPress={() => {
                                                this.setState({
                                                    showBgView: true,
                                                    selectCount: 100
                                                })
                                            }}>
                                            <View style={styles.chooseViewStyle}>
                                                <Icon style={{ fontSize: 17 }} name={'add'} />
                                                <Text style={{ fontSize: 12, color: '#383838' }}>上传图片</Text>
                                            </View>

                                        </TouchableOpacity> : null
                                    }

                                </View>
                                <View style={{ height: 10, backgroundColor: Config.ColorBf4 }} />

                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Config.ColorBf4, marginTop: 10 }}>
                                    <Text style={styles.textStyle}>联系电话</Text>
                                    <Input keyboardType={"numeric"} style={styles.inputStyle} placeholder="请输入您的手机号码"
                                        onChangeText={(phone) => {
                                            this.setState({ phone })
                                        }} value={this.state.phone} />
                                </View>
                            </Content>
                            <View style={{ height: Config.BtnComHeight, position: 'absolute', bottom: px2dp(220), width: screenWidth - 20, marginLeft: 10 }}>
                                <TouchableOpacity disabled={!this.isAble()} style={{backgroundColor: this.isAble() ? Config.ColorOff : Config.ColorBf2, flex: 1,
                                    alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: this.isAble() ? Config.ColorOff : Config.ColorBf2
                                }} onPress={() => { this.onFeedback() }}>
                                    <Text style={{ color: this.isAble() ? Config.ColorW : Config.ColorB999 }}>
                                        提交
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {
                                this.state.showBgView ? <TouchableOpacity style={{
                                    backgroundColor: 'black',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    opacity: 0.5,
                                    width,
                                    height
                                }} onPress={() => {
                                    this.dismissAlert();
                                }} /> : null
                            }

                            {
                                this.state.showBgView ? <View style={{
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width,
                                    height: this.state.selectCount !== 100 ? 172 + 41 : 172
                                }}>

                                    <View style={styles.bottomViewStyle}>
                                        <Text style={{ fontSize: 14 }}>选择照片</Text>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: '#f3f3f3' }} />
                                    <TouchableOpacity style={styles.bottomViewStyle} onPress={this.chooseCamera}>
                                        <Text style={{ fontSize: 17, color: '#0772E8' }}>相机</Text>
                                    </TouchableOpacity>
                                    <View style={{ height: 1, backgroundColor: '#f3f3f3' }} />
                                    <TouchableOpacity style={styles.bottomViewStyle} onPress={this.choosePhone}>
                                        <Text style={{ fontSize: 17, color: '#0772E8' }}>相册</Text>
                                    </TouchableOpacity>
                                    {
                                        this.state.selectCount !== 100 ? <View>
                                            <View style={{ height: 1, backgroundColor: '#f3f3f3' }} />

                                            <TouchableOpacity style={styles.bottomViewStyle} onPress={() => {
                                                let newData = this.state.images;
                                                newData.splice(this.state.selectCount, 1);

                                                this.setState({
                                                    images: newData,
                                                });
                                                this.dismissAlert()
                                            }
                                            }>
                                                <Text style={{ fontSize: 17, color: '#0772E8' }}>删除</Text>

                                            </TouchableOpacity>
                                        </View> : null
                                    }

                                    <View style={{ height: 10, backgroundColor: '#f3f3f3' }} />

                                    <TouchableOpacity style={styles.bottomViewStyle} onPress={() => {
                                        this.dismissAlert();
                                    }}>
                                        <Text style={{ fontSize: 17, color: '#0772E8' }}>取消</Text>
                                    </TouchableOpacity>
                                </View> : null
                            }

                        </Container>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    inputStyle: { marginLeft: 10, fontSize: 14, width: 200 },
    textStyle: { fontWeight: 'bold', fontSize: 14, marginLeft: 10 },
    bottomViewStyle: { alignItems: 'center', height: 40, justifyContent: 'center' },
    chooseViewStyle: { width: imageSize.width, height: imageSize.height, backgroundColor: Config.ColorBf4, justifyContent: 'center', alignItems: 'center' },
    textInputStyle: {
        backgroundColor: Config.ColorBf4,
        fontSize: 12,
        ...Platform.select({
            ios: {
                height: 200,
            },
        }),
    },
})
