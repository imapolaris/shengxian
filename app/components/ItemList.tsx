import {RouteComponentProps} from "react-router";
import * as React from "react";
import {Container,List,Button,Icon} from 'native-base';
import ViewItem from "./ViewItem";
import {ItemBase, ItemDynamicArray, ItemDynamic} from "../store/EntitiesState"
import {View,Text,Image} from "react-native";
import {withRouter} from "react-router"
import {ComHeader} from "./ComHeader";
import MyStatusBar from "./MyStatusBar";
import * as PropTypes from "prop-types";
import {Config, px2dp} from "../config/Config";
import {ORDERDETAIL} from "../constants/RouterDefine";
import * as goback from '../../images/goback.png';

const  ComHeaderWithRouter= withRouter(ComHeader);

export interface ItemListProps extends Partial<RouteComponentProps<any>>{
	itemDynamics:ItemDynamicArray   //库存
}

export default class ItemList extends React.Component<ItemListProps>{
    static contextTypes={
        router:PropTypes.object
    }

    constructor(props:any){
        super(props)
	}
	
	getItemDynamic(id:number):ItemDynamic|undefined{
        return this.props.itemDynamics.data.find((item)=>item.id == id);
	}
	getItemDynamicPrice(id:number):number{
		let dynamic = this.getItemDynamic(id);
        let price = dynamic ? dynamic.price: 10000;
        return price;
    }

    render(){
		let items = this.context.router.route.location.state.orderlist as ItemBase[];
		let from = this.context.router.route.location.state.from;
		let bshowDynamicPrice = (from != ORDERDETAIL) ? true:false
        return(
           <Container>
            <MyStatusBar />
            
            <View style={{flexDirection: 'row', width: '100%', height: Config.HeadHeight, 
                            justifyContent: 'space-between', alignItems: 'center', backgroundColor: Config.ColorW}}>
                    <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                        <Button transparent onPress={()=>{this.props.history && this.props.history.goBack()}}>                            
                            <Image source={goback} style={{width: px2dp(23),height: px2dp(23), marginLeft: 16}} />
                        </Button>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Config.ColorB333,  fontSize: Config.Font1125, marginLeft: -20}}>
                        商品清单
                        </Text>
                    </View>

                    <View style={{marginRight: 20,width:'20%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{textAlign: 'right', marginRight: 16, fontSize:Config.Font0875}}>{"共"+ items.length + "件"} </Text>
                    </View>
                </View>
           <View style={{height: 10, backgroundColor: '#f3f3f3'}}></View>
            {/*商品列表*/}
            <List dataArray={items} renderRow={(item)=>{
                return <ViewItem Item={item} DynamicPrice={ bshowDynamicPrice ? this.getItemDynamicPrice(item.item_id): item.price } />
            }
                }
            />
        </Container>);
    }
}