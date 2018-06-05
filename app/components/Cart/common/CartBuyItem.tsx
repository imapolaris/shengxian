import * as React from "react";
import {Icon, Button,ListItem, Thumbnail, Body, CheckBox} from 'native-base';
import {View, Dimensions, Text, Animated, TouchableOpacity} from "react-native";
import {Item, ItemDynamic} from "../../../store/EntitiesState";
import {formatLeftCnt, formatMoney} from "../../../common/utils/funcs";
import timing = Animated.timing;
import {Config, px2dp} from "../../../config/Config";
import { CATEGORYDETAIL} from "../../../constants/RouterDefine";
import {RouteComponentProps} from "react-router"

const screenWidth = Dimensions.get('window').width;
export interface CartBuyItemProps extends Partial<RouteComponentProps<any>>{   
    itemData: Item,
    dynamic?:ItemDynamic,
    sectionID: number,
    itemID: number,
    onAddItem:(itemIndex: number)=>void
    onSubItem:(itemIndex: number)=>void
    checkItem:(itemIndex: number)=>void
    checked:boolean,
    count:number
}
export interface CartBuyItemState{
    isSelect: boolean
}


export default class CartBuyItem extends React.Component<CartBuyItemProps,CartBuyItemState>{
    constructor(props:any){
        super(props);

        this.onAddItem = this.onAddItem.bind(this);
        this.onSubItem = this.onSubItem.bind(this);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }

    /*减少物品数量*/
    onSubItem(){
        this.props.onSubItem(this.props.itemID)
    }

    /*增加物品数量*/
    onAddItem(){
        this.props.onAddItem(this.props.itemID)
	}
    getLeftCnt(){
        if(!this.props.dynamic) return 0;
        return this.props.dynamic.leftcnt;
    }
	clickItem()
	{
		let section = {id: 1, title: '上海真好吃餐厅',select: true};
		let {dynamic} = this.props
		this.props.history && this.props.history.push(CATEGORYDETAIL, {section: section, item: this.props.itemData,dynamic})
	}

    render(){
        let leftcnt = this.getLeftCnt();
        let fmtcnt= formatLeftCnt(leftcnt);
        let item = this.props.itemData;
        let {dynamic} = this.props;
        let price = dynamic ? dynamic.price : 10000;
        let marketprice = dynamic ? dynamic.marketprice : 10000;
        return (
            <View style={{flexDirection: 'row', height: Config.CarItemHeight}} >
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>{this.props.checkItem(this.props.itemID)}}>
                        <View style={{width:20,height:px2dp(70), justifyContent:'center',alignItems:'center'}}>

                            <CheckBox onPress={()=>{
                                this.props.checkItem(this.props.itemID)
                            }} checked={this.props.checked} color={Config.ColorG3c}/>
                        </View>
                    </TouchableOpacity>

					<TouchableOpacity onPress={()=>{this.clickItem()}}>
                    	<Thumbnail source={{ uri: Config.DomainName+ this.props.itemData.thumbnailsurl }}
                               style={{marginLeft:10, width:px2dp(90), height: px2dp(70)}}/>
					</TouchableOpacity>
                </View>
                <View>
					<TouchableOpacity onPress={()=>{this.clickItem()}}>
                    	<Text style={{fontSize: Config.Font09375, color:Config.ColorB333}}>{this.props.itemData.title}</Text>
						{/* <Text style={{color: Config.ColorB999, fontSize: Config.Font075}}>{this.props.itemData.funceffect}</Text> */}
					</TouchableOpacity>
                    
                    <View style={{width: screenWidth - 150 - 10, flexDirection:"row",marginTop:10,alignItems:"center", justifyContent: 'space-between'}}>
						<TouchableOpacity onPress={()=>{this.clickItem()}}>
                            {fmtcnt?<Text style={{color: Config.ColorOf8,marginLeft: 2, fontSize: Config.Font08125}}>{fmtcnt}</Text>:null}
                            {item.allow_place_type ?<Text style={{color: Config.ColorOf8,marginLeft: 2, fontSize: Config.Font08125}}>限购{item.allow_place_type}件</Text>:null }
							<Text style={{color: Config.ColorOf8, fontSize: Config.Font10625}}>￥{formatMoney(price ||0)}</Text>
						</TouchableOpacity>

                        <View style={{flexDirection:"row", alignItems: 'center'}}>
                            <Button style={{justifyContent: 'center', width: 45, height: 45}} iconLeft
                                    onPress={this.onSubItem} transparent>
                                <Icon name="remove-circle" style={Config.styles.addCircle} />
                            </Button>
                            <Text style={{width: 35, textAlign: 'center'}}>{this.props.count}</Text>
                            <Button style={{justifyContent: 'center', width: 45, height: 45}} iconRight onPress={this.onAddItem} transparent>
                                <Icon name="add-circle" style={Config.styles.addCircle} />
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
