import * as React from 'react';
//import {AMapManager, PoiItem, PoiSearchOptions, PoiSearchResult} from 'react-native-smart-amap';
import {Dimensions, NativeAppEventEmitter, View, TouchableOpacity, BackHandler} from "react-native";
import {List,Item,Icon,Input,ListItem,Text} from "native-base";
import * as PropTypes from 'prop-types'
import {PinLocation} from "../store/CurrentUserState";
import {AMapProps, AMapState} from "./AMap";
import {AMapOpType} from "../store/UIState";
const POI_PAG_SIZE:number = 30;

let {width} = Dimensions.get("window");
export default class AMapSearch extends React.Component<AMapProps,Partial<AMapState>>{
    static contextTypes={
        router:PropTypes.object
    }
    constructor(props:any){
        super(props);
        this.onStartSearch = this.onStartSearch.bind(this);
        this.onSearched = this.onSearched.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onBack = this.onBack.bind(this);
        this.state={
            keywords:"",
            search:false,
            count:POI_PAG_SIZE,
            poiDatas:[],
            opType:props.uiData.opType
        }
    }
    onSearched(result:any){
        if(result.result && result.result.length > 0){
            this.setState({poiDatas:result.result});
        }else{
            this.setState({poiDatas:[]});
        }
    }

    onSelected(item:any){
        let pos:PinLocation = {
            name:item.name || "",
            address:item.address || "",
            lat:item.coordinate && item.coordinate.latitude || 0,
            lng:item.coordinate && item.coordinate.longitude || 0,
            city:item.city || ""
        }
        if(this.state.opType == AMapOpType.selelctAddAddr){
            this.props.changeAddr(pos);
        }else {
            this.props.updateLocation && this.props.updateLocation(pos);
        }
        this.context.router.history && this.context.router.history.go(-2);
    }
    onBack(){
        this.context.router.history && this.context.router.history.goBack();
        return true;
    }
    componentDidMount(){
        NativeAppEventEmitter.addListener("amap.onPOISearchDone",this.onSearched);
        BackHandler.addEventListener("hardwareBackPress",this.onBack);
    }

    componentWillUnmount(){
        NativeAppEventEmitter.removeListener("amap.onPOISearchDone",this.onSearched);
        BackHandler.removeEventListener("hardwareBackPress",this.onBack);
    }

    onStartSearch(keywords:string){
         const searchOptions:any ={
            keywords,
            page:0,
            count:this.state.count || POI_PAG_SIZE,
            city:this.props.currentLocation.city || "上海"
        };
        //AMapManager && AMapManager.searchPoi(searchOptions);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#c0c0c0c0',width:width,alignItems:"center",height:50}}>
                    <Item bordered style={{flex:1,backgroundColor:'white',alignSelf:"center",marginVertical:10,height:30,marginHorizontal:10}}>
                        <Icon active name='search' />
                        <Input placeholder='查找小区|大厦|学校等' onChangeText={this.onStartSearch} autoFocus/>
                    </Item>
                </View>
                <List style={{flex:1,margin:0,paddingHorizontal:0}} dataArray={this.state.poiDatas} renderRow={(data)=>(
                    <ListItem key={data.uid}  style={{marginLeft:0}}>
                        <TouchableOpacity  style={{flex:1,alignItems:"center"}} activeOpacity={0.5} onPress={()=>{this.onSelected(data)}}>
                            <View>
                                <Text>{data.name}</Text>
                                <Text note>{data.address}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>)} />
            </View>
        )
    }
}
