import * as React from "react";
import { Icon } from 'native-base';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    AppState,
    NativeAppEventEmitter
} from "react-native";

import AMapLocation from 'react-native-smart-amap-location'

//import * as HomeAddress from '../asset/home_address';
//import * as HomeArrowDown from '../asset/home_arrow_down';
//import * as HomeSearch from '../asset/home_search';
import * as ConstValue from '../../../constants/iOSScreenAuto';
import { Config } from "../../../config/Config";
import * as search from '../../../../images/search.png';
import * as postion from '../../../../images/postion.png';
import * as down from '../../../../images/down.png';
import {LocationHelper} from "../../../util/locationHelper";
import {PinLocation} from "../../../store/CurrentUserState";
const screenWidth: number = Dimensions.get('window').width;
const maxLength: number = 6;
export interface HomeTopBarProps {
    address: string,
    addressClick: () => void,
    searchClick: () => void,
}
export interface HomeTopBarState {
    POIName:string,
    currentAppState:string
}

export default class HomeTopBar extends React.Component<HomeTopBarProps, HomeTopBarState>{

    state = {

        POIName:'正在定位中...',
        currentAppState: AppState.currentState,

    }

    componentDidMount() {

        LocationHelper.getLocation((location:any)=>{

            console.log('LocationHelperasdjhajksdhjkashd +' + location)
            this.setState({
                POIName:location.name
            })

        })

        AMapLocation.init(null) //使用默认定位配置
        NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult);
        // if(!this.state.POIName)this._showReGeocode()
        this.appStateListener()
        AMapLocation.getLocation()
        if(this.state.POIName === '正在定位中...'){
            console.log('开始定位')
            this._showReGeocode()
        }
    }

    componentWillUnmount(){

        NativeAppEventEmitter.removeListener("amap.location.onLocationResult",this._onLocationResult);
        //停止并销毁定位服务
        AMapLocation.cleanUp()
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    appStateListener = ()=>{
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState:string) => {
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {

            console.log('到前台')

            if(this.state.POIName === '正在定位中...'){
                console.log('开始定位')
                this._showReGeocode()
            }
        }
        this.setState({currentAppState: nextAppState});
    }

    //单次定位并返回逆地理编码信息
    _showReGeocode = () => {

        console.log('_showReGeocode')

        AMapLocation.getReGeocode()

    }

    _onLocationResult = (result:any) => {

        console.log('_onLocationResult + ' + JSON.stringify(result))

        if(result.error) {
            // Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
            console.log(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if(result.formattedAddress) {
                // Alert.alert(`格式化地址 = ${result.formattedAddress}`)

                console.log(`格式化地址 = ${result.formattedAddress}`)

                if(this.state.POIName === '正在定位中...'){
                    console.log('开始定位')
                    this.setState({
                        POIName:result.POIName
                    })
                }

            }
            else {

                // Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
                console.log(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
                console.log('获取用户定位,更新定位updateCurrentLocation')
                LocationHelper.updateCurrentLocation({name:'当前位置', address:'最新地址', lat:result.coordinate.latitude, lng:result.coordinate.longitude, city:"1"})
            }
        }
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity style={styles.addressStyle} onPress={() => { this.props.addressClick(); }}>
                    <Image style={{ height: 20, width: 20, alignSelf: 'center' }} source={postion} resizeMode='contain' />
                    <Text style={{backgroundColor: 'transparent', marginLeft: 5, color: Config.ColorW, fontSize: 15, fontWeight: '100' }}>{this.state.POIName || "定位中......"}</Text>
                    <Image style={{ height: 12, width: 12, marginTop: 2,marginLeft: 5 }} source={down} resizeMode='contain' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchStyle} onPress={() => { this.props.searchClick(); }}>
                    <Image style={{ height: 20, width: 20 }} source={search} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginTop: ConstValue.StatusBar_Height,
            },
            android: {
                marginTop: 0,
            },
        }),
        backgroundColor: 'white',
    },
    viewStyle: {
        flex:1,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 25,
        marginLeft:15,
        marginRight:15,
        alignItems: 'center'
    },
    addressStyle: {
        flexDirection: 'row',
        width: screenWidth - 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Config.SearchHeight,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    searchStyle: {
        width: 30,
        justifyContent: 'flex-end',
        alignItems:'center'
    },
    searchText: {
        fontSize: Config.Font0875,
        color: Config.ColorB999,
    }
});

