import * as React from 'react';
import {StyleSheet, TouchableHighlight,TouchableOpacity,Dimensions,Image} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
import {RouteComponentProps} from "react-router"
import Line from "./Line"
import MyStatusBar from "./MyStatusBar"
// import {Util} from "../common/utils/util";
const pichead = {uri:"screen"}
import {Item, CategoryArray, ItemDynamicArray} from "../store/EntitiesState";
import {SearchUIState} from "../store/UIState";
import {leftItemModel, leftItemDataModel, getAllItemWithCategoryID, getFirstCategoryID, searchItem} from './Category/interfaceUtil/DataUtil';
import RightItem from './Category/common/CategoryRightItem';
import {CATEGORYDETAIL, NavScreenKey, SEARCHRESULT} from "../constants/RouterDefine";
import {Config, px2dp} from "../config/Config";
import * as goback from '../../images/goback.png';
import * as search_h from '../../images/search_h.png';
export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 30},
    body:{ flexDirection:"row" ,flex:1},    
    // fonttxt: {color:'#000', fontSize:15 },
    fonticon: {color:Config.ColorB999, fontSize:20 },
})
//f4f4f4
export const saddr = StyleSheet.create({
    bk:{backgroundColor:'#f3f3f3'},
    btndel:{backgroundColor:'#fff'},  
    fonticon: {color:'#383838', fontSize:15, height: 20, width: 20},
    // fonttxt: {backgroundColor:'#f3f3f3',   borderRadius:5},
    fontbtn: {backgroundColor:'transparent', margin:5, height:25, borderWidth: 1,paddingBottom:10, borderRadius: 10, borderColor: '#b5b5b5'},
	// fontbtn: {backgroundColor:'#f3f3f3', margin:5, borderRadius:5, },
    
})
const screenWidth = Dimensions.get('window').width;
let lastsearchtext = '菜 肉 鱼 米 油'
export var seachhot =  
[
    "菜","肉","鱼","蛋","米","油","豆制品","干货","水果"
]

export interface SearName{
    name:string;
}
export interface SearchProps/* extends RouteComponentProps<any>*/{
	Search:SearchUIState,
	fetchSearch:(lastsearchtext:string, data:Array<string>)=>void,
	clearSearch:()=>void,
	// from:string,
}
export interface SearchState{
	title:string
	shistory:Array<string>
}
export default class Search extends React.Component<SearchProps,SearchState>{
    constructor(props:any){
        super(props)
        this.state = {
			title: this.props.Search.lastsearchtext,
			//shistory:[],
			shistory: this.props.Search.data,
        }
	}
	// componentDidMount(){
	// 	this.props.fetchSearch(this.props.Search.version);
	// 	console.log("----------componentDidMount111--Coupon-")
	// }
	setSearchName(name:string)
    {
		let value = (name.length > 0) ? this.state.shistory.find((SN:string)=>{return SN == name}) :undefined
		lastsearchtext = name
		let shistory =  value ? [...this.state.shistory ] : [...this.state.shistory, name] 
        this.setState({
			title: name,			
			shistory:  shistory 
		});
		this.props.fetchSearch(lastsearchtext, shistory);
		this.props.navigation.navigate(NavScreenKey.SearchResult, {title:name})
	}
	clearHistory()
    {
		this.props.clearSearch();
        this.setState({
            shistory:[],
		});
    }
    render() {
		let rightDataSource: Array<Item> = (this.state.title.length == 0)?[] : searchItem(this.state.title)	
		// let shistory = this.props.Search.data

        return (
            <Container>
            <MyStatusBar />
{/* 头部 */}

				<View style={{width: '100%', height:Config.HeadHeight, backgroundColor: Config.ColorW, flexDirection: 'row' , marginRight: 30, 
								alignItems:'center', justifyContent: 'center'}}>
                    <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
						<Image source={goback} style={{width: px2dp(23),height: px2dp(23), marginLeft: 16, marginTop: 13, marginRight: 5}} />
                    </Button>
					
                    <Button style={{flex: 1, height: Config.SearchHeight, flexDirection: 'row', alignItems: 'center', width: '83%',
                                    backgroundColor: Config.ColorBf2, borderRadius: 15, marginRight: 10,  marginTop: 15}}>
                       
                        <Image  source={search_h} style={{ height: 20, width: 20,alignItems: 'center',justifyContent:'center', marginRight: -1, marginLeft: 10, marginTop: 2 }} resizeMode='contain' />
						<Input selectTextOnFocus={true} style={{color: Config.ColorB999, fontSize: Config.Font0875, justifyContent: 'center', alignItems: 'center'}}  placeholder={this.state.title} value={this.state.title}  onChangeText={(text) => this.setState({title : text})} 
							onSubmitEditing = {(text)=>{this.setSearchName(this.state.title)}}/>
                   	</Button>                   
                </View>
                        
{/* 下面 */}
                	<View style={{flex:1, backgroundColor: Config.ColorW}}>
	                    <View style={{flexDirection:'row', paddingLeft: 10, backgroundColor: Config.ColorBf4, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 30}}>
	                        <Text style={{flex:1, color: Config.ColorB333}}>历史搜索</Text>
							<TouchableHighlight onPress={()=>{this.clearHistory()}}>
	                        	<Icon name="trash" style={[saddr.fonticon]}  />    
							</TouchableHighlight>
	                    </View>
	                    
	                    <View style={{flexWrap: 'wrap', flexDirection:'row', marginTop: 10}}>
						{/* {
	                        seachhot.map((item:SearName, key:number)=>
	                            {
	                                return <Button transparent style={saddr.fontbtn} onPress={()=>{this.setSearchName(item.name)}} key = {key} >
	                                        <Text style={{color:'#8fb140'}} >{item.name}</Text>
	                                    </Button>
	                            }
	                        )
	                    } */}
	                    {
	                        this.state.shistory.map((name:string, key:number)=>
	                            {
	                                return <Button transparent style={saddr.fontbtn} onPress={()=>{this.setSearchName(name)}} key = {key} >
	                                        <Text style={{color:'#8fb140', paddingTop: 5}} >{name}</Text>
	                                    </Button>
	                            }
	                        )
	                    }
	                    </View>

	                    <View style={{marginTop: 10, height: 30, backgroundColor: Config.ColorBf4, justifyContent: 'center', paddingLeft: 10}}>
	                        <Text style={{color: Config.ColorB333}}>热门搜索</Text>
	                    </View>
	                    
	                    <View style={{flexWrap: 'wrap', flexDirection:'row', marginTop: 10}}>
	                        {
	                            seachhot.map((name:string, key:number)=>
	                                {
	                                    return <Button transparent style={saddr.fontbtn} onPress={()=>{this.setSearchName(name)}}  key = {key}  >
	                                        <Text style={{color:'#8fb140', paddingTop: 5}}>{name}</Text>
	                                    </Button>
	                                }
	                            )
	                        }
	                    </View>
	                </View>

					{/* <View style={{height: 44, position:'absolute',bottom: 0,width:screenWidth}}>
                        <TouchableOpacity style={{backgroundColor: '#50be07', flex: 1, alignItems: 'center',justifyContent: 'center'}}
                                          >
                            <Text style={{color: 'white'}}>
                                
                            </Text>
                        </TouchableOpacity>
                    </View> */}

					{/* <List
	                    dataArray = {rightDataSource}
						renderRow={(item: Item)=>{
							return  <TouchableOpacity onPress={()=>{this.setSearchName(item.title);}}>
										<View key={item.id} >
											<Text style={{color:'#000'}}>{item.title}</Text>
										</View>
									</TouchableOpacity>

                <View style={[saddr.bk, {flex: 1}]}>
                    <View style={{flexDirection:'row', paddingLeft: 10, backgroundColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 30}}>
                        <Text style={{flex:1, color: '#3b3b3b'}}>历史搜索</Text>
                        <Icon name="trash" style={[saddr.fonticon]}  />    
                    </View>
                    
                    <View style={{flexWrap: 'wrap', flexDirection:'row', marginTop: 10}}>
                    {
                        seachhot.map((item:SearName, key:number)=>
                            {
                                return <Button transparent style={saddr.fontbtn} onPress={()=>{this.setSearchName(key)}} key = {key} >
                                        <Text style={{color:'#8fb140'}} >{item.name}</Text>
                                    </Button>
                            }
                        )
                    }
                    </View>

                    <View style={{marginTop: 10, height: 30, backgroundColor: '#e8e8e8', justifyContent: 'center', paddingLeft: 10}}>
                        <Text style={{color: '#3b3b3b'}}>热门搜索</Text>
                    </View>
                    
                    <View style={{flexWrap: 'wrap', flexDirection:'row', marginTop: 10}}>
                        {
                            seachhot.map((item:SearName, key:number)=>
                                {
                                    return <Button transparent style={saddr.fontbtn} onPress={()=>{this.setSearchName(key)}}  key = {key}  >
                                        <Text style={{color:'#8fb140'}}>{item.name}</Text>
                                    </Button>
                                }
                            )
                        }
                    </View>
                </View>

						}}
	                /> */}
				
            </Container>
        );
    }
}