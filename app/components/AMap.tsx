import * as React from 'react';
import AMapView, {AMapOptions, Coordinate, OnMovedEvent, PoiItem, PoiSearchResult} from 'react-native-smart-amap';
import {Dimensions, NativeAppEventEmitter, View, TouchableOpacity, BackHandler, Platform, Animated} from "react-native";
import {List,Item,Icon,Input,ListItem,Text,Button} from "native-base";
import {RouteComponentProps} from "react-router";
import * as PropTypes from "prop-types";
import {PinLocation} from "../store/CurrentUserState";
import {AMapOpType, AMapUIState} from "../store/UIState";
import {Address} from "../store/EntitiesState";
import {Image, Keyboard} from 'react-native'
import AMapLocation from 'react-native-smart-amap-location'
import * as goback from '../../images/goback.png';
import * as search from '../../images/search.png';

const screenWidth:number = Dimensions.get('window').width;

import add = Animated.add;
import {Config, IS_IPHONE_X, px2dp} from "../config/Config";
import {StatusBar_Height} from "../constants/iOSScreenAuto";
import {LocationHelper} from "../util/locationHelper";

const POI_PAG_SIZE:number = 30;
const DEFAULT_MAP_ZOOM_LEVEL:number = 17.1;

export interface AMapProps extends Partial<RouteComponentProps<any>>{
    updateLocation?:(locate:PinLocation)=>void
    changeAddr:(locate:PinLocation)=>void
    updateUiAddr:(addr:Partial<Address>)=>any
    currentLocation:PinLocation
    uiData:AMapUIState
}

export interface AMapState{
    center:Coordinate
    keywords:string
    search:boolean
    count:number
    poiDatas:PoiItem[]
    opType:AMapOpType,
    latitude:number,
    longitude:number
}

let {width} = Dimensions.get("window");
export default class AMap extends React.Component<AMapProps,AMapState>{
    static contextTypes={
        history:PropTypes.object
    };
    _AMap:AMapView;
    constructor(props:any){
        super(props);

        this.onMoved = this.onMoved.bind(this);
        this.onSearched = this.onSearched.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onFocusSearch = this.onFocusSearch.bind(this);
        this.onBlurSearch = this.onBlurSearch.bind(this);
        this.onStartSearch= this.onStartSearch.bind(this);
        this.onBack  = this.onBack.bind(this);
        // 起始位置
        let address = props.location.state as Address;
        let center = {latitude:LocationHelper.currentLocation.lat,longitude:LocationHelper.currentLocation.lng};
        if(address && address.lat && address.lng){
            center={latitude:address.lat,longitude:address.lng}
        }
        this.state={
            keywords:"",
            search:false,
            count:POI_PAG_SIZE,
            center,
            poiDatas:[],
            opType:props.uiData.opType,
            latitude:0,
            longitude:0
        }
    }

    onSearched(result:PoiSearchResult){
        console.log("resultconsole.log('dadadadadadzzzzzzzz')",result);
        if(result.searchResultList && result.searchResultList.length > 0){
            this.setState({poiDatas:result.searchResultList});
        }else{
            this.setState({poiDatas:[]});
        }
    }

    onSelected(item:PoiItem){
        let pos:PinLocation = {
            name:item.name || "",
            address:item.address|| "",
            lat:item.latitude|| 0,
            lng:item.longitude|| 0,
            city:item.cityName|| ""
        };

        console.log(`选择的地址${item.address},经纬度 = ${item.latitude} + ${item.longitude}`)

        // 地图中心点
        if(this._AMap && item.latitude && item.longitude){
            this._AMap.setCenterCoordinate({latitude:item.latitude,longitude:item.longitude});
        }
        
        if(this.state.opType == AMapOpType.selelctAddAddr){
            let addr : Partial<Address> ={
                building        : item.name || "",             //小区
                address         : item.address||"",             //地址
                lat             : item.latitude||0 ,             //纬度
                lng             : item.longitude||0              //经度
            }
            this.props.updateUiAddr(addr)

        }else {
            this.props.updateLocation && this.props.updateLocation(pos);
        }

        if (this.state.search) {

            this.setState({search:false})

            Keyboard.dismiss();

        }else {

            this.props.history && this.props.history.goBack()
        }


    }

    //这里监听到用户的位置
    _onLocationResult = (result:any) => {
        if(result.error) {
            console.log(`map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if(result.formattedAddress) {
                console.log(`map-格式化地址 = ${result.formattedAddress}`)
            }
            else {
                console.log(`map-纬度 = ${result.coordinate.latitude}, map-经度 = ${result.coordinate.longitude}`)




                this.setState({
                    latitude:result.coordinate.latitude,
                    longitude:result.coordinate.longitude
                })
                let address = this.props.location ? this.props.location.state as Address : undefined;
                let center = {latitude:this.props.currentLocation && this.props.currentLocation.lat || result.coordinate.latitude,longitude:this.props.currentLocation && this.props.currentLocation.lng || result.coordinate.longitude};
                if(address && address.lat && address.lng){
                    center={latitude:address.lat,longitude:address.lng}
                }

                setTimeout(()=>{
                    this._AMap.setCenterCoordinate({latitude:center.latitude,longitude:center.longitude});
                },500)


            }
        }
    }

    onBack(){
        this.props.history && this.props.history.goBack();
        return true;
    }
    componentDidMount(){
        AMapLocation.init(null) //使用默认定位配置
        NativeAppEventEmitter.addListener("amap.onPOISearchDone",this.onSearched);
        NativeAppEventEmitter.addListener("amap.location.onLocationResult",this.onSearched);
        BackHandler.addEventListener("hardwareBackPress",this.onBack);

    }

    componentWillUnmount(){

        NativeAppEventEmitter.removeListener("amap.onPOISearchDone",this.onSearched);
        NativeAppEventEmitter.removeListener("amap.location.onLocationResult",this.onSearched);
        BackHandler.removeEventListener("hardwareBackPress",this.onBack);
        AMapLocation.cleanUp()

    }

    onMoved(event:OnMovedEvent){
        this.setState({center:event.nativeEvent.data.centerCoordinate});
        let {keywords,count} = this.state;
        const searchOptions:any ={
            coordinate:event.nativeEvent.data.centerCoordinate,
            types:"商务住宅|学校",
            keywords,
            page:0,
            count,
        };
        this._AMap && this._AMap.searchPoiByCenterCoordinate(searchOptions)
    }
    onFocusSearch(){
        this.setState({search:true})
    }
    onBlurSearch(){
        this.setState({search:false})
    }
    onStartSearch(keywords:string){

        console.log('dadadadadadzzzzzzzz + ' + keywords)
        this._AMap && this._AMap.searchLocation(keywords)
    }

    render(){
        let {latitude,longitude} = this.state.center
        let option:AMapOptions ={
            frame: {
                width: screenWidth,
                height: this.state.search?0:300
            },
            zoomLevel:DEFAULT_MAP_ZOOM_LEVEL,
            showsUserLocation:true,
            centerMarker: (Platform.OS == 'ios') ? 'icon_location' : 'poi_marker',
            centerCoordinate:{latitude:latitude || LocationHelper.currentLocation.lat ,longitude:longitude || LocationHelper.currentLocation.lng}
        };
        return (
            <View style={{flex:1, marginTop: 5}}>
                <View>
                    <AMapView style={{height:this.state.search?0:300}} onDidMoveByUser={this.onMoved} options={option}
                              ref={(item)=>{item && (this._AMap = item)} }>
                    </AMapView>
                    <Button style={{width: 50, height: 50, position: 'absolute', right: 10, bottom: 20, borderWidth: 0.5,
                                backgroundColor: 'rgba(246, 246, 246, 0.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderColor: '#ffffff' }}
                        onPress={ () => {
                            this._AMap.setCenterCoordinate({latitude:LocationHelper.currentLocation.lat,longitude:LocationHelper.currentLocation.lng});
                            //this._activityIndicator.setState({ visible: true,})
                        }}>
                        
                        <Icon name={Platform.OS == 'ios' ? 'ios-locate-outline' : 'md-locate'} style={{width: 40, justifyContent: 'center', 
                                alignItems: 'center', color: Config.ColorG3c, alignSelf: 'center', marginLeft: 38}}/>
                        {/* <Image style={{width:30,height:30}} source={{uri: Platform.OS == 'ios' ? 'gpsStat1' : 'md-locate'}}/> */}
                    </Button>
                </View>

                <View style={{height:35,borderBottomWidth:1,borderColor:"#f3f3f3", justifyContent: 'center', marginLeft: 10}}>
                    <Text>附近地址</Text>
                </View>
                <List keyboardShouldPersistTaps={'always'} style={{flex:1,margin:0,paddingHorizontal:0}} dataArray={this.state.poiDatas} renderRow={(data)=>(
                    <ListItem key={data.uid}  style={{marginLeft:0}}>
                        <TouchableOpacity  style={{flex:1,alignItems:"center"}} activeOpacity={0.5} onPress={()=>{this.onSelected(data)}}>
                            <View>
                                <Text>{data.name}</Text>
                                <Text note>{data.address}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>)} />
                <View style={{position:'absolute',left:0, top:0, paddingTop:IS_IPHONE_X()?44:20,flexDirection:'row',
                backgroundColor:'white', height:IS_IPHONE_X()?88 : 64, width:screenWidth,
                paddingRight: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Button style={{width: px2dp(40), height: Config.BtnComHeight, marginRight: 10}} transparent onPress={()=>{this.props.history && this.props.history.goBack()}}>
                        <Image source={goback} style={{height: px2dp(23), width:px2dp(23), marginLeft: 20}} />
                    </Button>
                    <View style={{backgroundColor:'white',alignItems:"center", height:44, paddingRight:10,width:(screenWidth - 44
                    )}}>
                        <Item bordered style={{flex:1,backgroundColor: Config.ColorBf2, alignSelf:"center", borderWidth: 0.5, borderRadius: 15, marginVertical:10,height:Config.SearchHeight,marginHorizontal:10}}>                            
                            <Image style={{ height: 20, width: 20,alignItems: 'center',justifyContent:'center', marginRight: -1, marginLeft: 10, marginTop: 2 }} source={search} resizeMode='contain' />
                            <Input placeholder='查找小区|大厦|学校等' style={{color: Config.ColorB999, fontSize: Config.Font0875, justifyContent: 'center', alignItems: 'center'}} onFocus={this.onFocusSearch} onBlur={this.onBlurSearch} onChangeText={this.onStartSearch}/>
                        </Item>
                    </View>

                </View>
            </View>
        )
    }
}
