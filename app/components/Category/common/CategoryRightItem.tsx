import * as React from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'native-base';
import {Item, ItemDynamic} from "../../../store/EntitiesState";
import anything = jasmine.anything;
import {formatLeftCnt, formatMoney} from "../../../common/utils/funcs";
import {Config, px2dp} from "../../../config/Config";

const screenWidth:number = Dimensions.get('window').width;
const imageWidth:number = px2dp(100);		//100
const imageHeight:number = px2dp(105);		//105叮咚，110百果园

export interface CategoryRightItemProps {
    item: Item,
    dynamic?:ItemDynamic,
    itemClick: ()=>void,
    addItemClick: (e:any)=>void,
    isHome: boolean
}
export interface CategoryRightItemState{
    selectCount: number
}
export default class CategoryRightItem extends React.Component<CategoryRightItemProps, CategoryRightItemState>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectCount: this.props.item.buycnt,
        };

        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.getLeftCnt = this.getLeftCnt.bind(this);
    }
    getLeftCnt(){
        if(!this.props.dynamic) return 0;
        return this.props.dynamic.leftcnt;
    }
    /*减*/
    remove(){
        if (this.state.selectCount === 0){

        }else {
            this.setState({
                selectCount: this.state.selectCount-1
            })
        }
    }

    /*加*/
    add(e:any){
        this.props.addItemClick(e);
    }

    render() {
        let {item} = this.props
        let leftcnt= formatLeftCnt(this.getLeftCnt());
        const addItem = <TouchableOpacity style={styles.addStyle} onPress={(e)=>{
                                this.add(e);
                            }}>
            <Icon style={Config.styles.addCircle} name="md-add-circle"/>
		</TouchableOpacity>;
		
		// let tmimageHeight = imageHeight
		// let addtitle = ""
		// // if (!this.props.isHome)
		// {
		// 	tmimageHeight = 105//	imageHeight+  (this.props.item.id % 5) * 10
		// 	addtitle = tmimageHeight.toString()
		// }

		let price = this.props.dynamic ? this.props.dynamic.price : 10000
		let marketprice = this.props.dynamic ? this.props.dynamic.marketprice : 10000
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.subViewStyle} onPress={()=>{this.props.itemClick()}}>
					{/* <Image style={this.props.isHome ? {width:imageWidth, height: tmimageHeight} : {width:imageWidth, height: tmimageHeight}} source={{uri: Config.DomainName+ this.props.item.thumbnailsurl}}/> */}
					<Image resizeMode={'contain'} style={this.props.isHome ? styles.imageStyleHome : styles.imageStyle} source={{uri: Config.DomainName + '/' + this.props.item.thumbnailsurl}}/>
                    <View style={{height: Config.CategoryRightHeight}}>
                        <View style={[{flex: 3}, {width: this.props.isHome ? screenWidth - imageWidth : screenWidth / 4 * 3 - imageWidth}]}>
                            <Text style={styles.titleStyle}>{this.props.item.title}</Text>
                            <Text style={styles.desStyle}>{this.props.item.funceffect}</Text>
                        </View>
                        {
                            leftcnt?(
                                <Text style={{
                                    marginLeft:10,fontSize: Config.Font0875,
                                    color:Config.ColorOf8}}>
                                    {leftcnt}
                                </Text>
                            ):null
                        }
                        {
                            (item.allow_place_type && item.allow_place_type> 0)? <Text style={{fontSize: Config.Font0875,marginLeft:10,
                                color:Config.ColorBb2}}>
                                限购{item.allow_place_type}件
                            </Text>:null
                        }

                        <View style={[{flex: 2,flexDirection: 'row', marginLeft: 7, marginTop: 5},
                            {width: this.props.isHome ? screenWidth - imageWidth : screenWidth / 4 * 3 - imageWidth}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'center',  alignItems: 'center'}}>
                                <Text style={{fontWeight:'bold', fontSize: Config.Font09375, color:Config.ColorOf8}}>￥</Text><Text style={styles.priceStyle}>{formatMoney(price)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center',  alignItems: 'center'}}>
                                <Text style={{fontSize: Config.Font0875,  marginTop: 8, marginLeft: 3, marginRight: 3, height: 20, color: Config.ColorBb2}}>
								 <Text style={{textDecorationLine: 'line-through', color:Config.ColorBb2}}>￥{formatMoney(marketprice)}</Text> </Text>
                                {/* <View style={{position: 'absolute',width: 50, top: 16, height:1, backgroundColor: '#000',left: 0, }}/> */}
                            </View>
                        </View>
                        
                    </View>
                </TouchableOpacity>
                <View style={styles.lineStyle}/>
                {
                    this.getLeftCnt() > 0 ? addItem:null
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
    },
    subViewStyle: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    imageStyle: {
        width: imageWidth,
        height: imageHeight
	},
	imageStyleHome: {
        width: imageWidth,
        height: imageHeight
    },
    titleStyle: {
        marginTop: 5,
        marginLeft: 10,
		fontSize: Config.Font09375,
		color:Config.ColorB333			//dingdong
    },
    desStyle: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: Config.Font075,
        color: Config.ColorB999
    },
    priceStyle: {
        color: Config.ColorOf8,
        fontSize: Config.Font10625,
    },
    utilStyle: {
        marginTop: 7,
        marginLeft: 5,
        color: '#666',
        fontSize: 12
    },
    addStyle: {
        position: 'absolute',
        right: 15,
        bottom:15,
        height:30,
        width:30,
        paddingVertical: 5
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#d9d9d9',
    }


});
/*
 * {
 //<Text style={styles.utilStyle}>{this.props.item.shortdesc}</Text>
 }*/