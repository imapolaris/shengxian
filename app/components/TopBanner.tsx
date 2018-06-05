import * as React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {Icon} from 'native-base';
import Swiper from 'react-native-swiper';
// import {bannerModel} from "../../../store/EntitiesState";
import { Config } from "../config/Config";
import {RouteComponentProps} from "react-router"
import {CATEGORYDETAIL, SHOPLIST, ADDRLIST, SEARCH, RECHARGE, MAIN, MAIN_ERROR} from "../constants/RouterDefine";
const screenWidth: number = Dimensions.get('window').width;
//const imageHeight:number = 300;

export interface HomeBannerProps  extends Partial<RouteComponentProps<any>> {
    item: Array<any>,
    imageHeight: number,
    autoplay: boolean,
    indexClick: (linkurl: string) => void,
    indexChange: (index: number) => void,
    address: string,
    addressClick: ()=>void,
    searchClick: ()=>void,
}
export interface HomeBannerState {
    currentIndex: number
}
const maxLength:number = 6;
export class HomeBanner extends React.Component<HomeBannerProps, HomeBannerState>{
    constructor(props: any) {
        super(props);
        this.state = {
            currentIndex: 1
        }
        this.formatterMaxString = this.formatterMaxString.bind(this);
    }
    /*设置字符串的最大长度，多余部分...显示*/
    formatterMaxString(string: string){
        return string.length > maxLength ? string.substr(0, maxLength) + '...' : string;
    }
    render() {
        let ImagCnt = this.props.item.length == 0 ? 1 : this.props.item.length;
        return (
            <View style={styles.container}>
                <Swiper width={screenWidth}
                    height={this.props.imageHeight}
                    autoplay={this.props.autoplay}
                    showsButtons={false}
                    showsHorizontalScrollIndicator={false}
                    loop

                    renderPagination={(index, total, context)=>(

                        <View style={styles.numberStyle}>
                            <Text>
                                {index+1}/{total}
                            </Text>
                        </View>)}

                    onIndexChanged={(index: number) => {

                        this.props.indexChange(index);
                    }}

                >
                    {
                        this.props.item.map((item, index) => {
                            let url = Config.DomainName + item.imgurl
                            return <TouchableOpacity onPress={() => { this.props.indexClick(item.linkurl) }} key={index} >
                                <Image key={item.id} style={{ height: this.props.imageHeight, resizeMode: 'cover' }} source={{ uri: url }} />
                            </TouchableOpacity>

                        })
                    }

                </Swiper>


                {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 40, position: 'absolute'}}>
                    <TouchableOpacity style={styles.viewStyle} onPress={() => {this.props.addressClick();}}>
                        <View style={styles.addressStyle}>
                            <Icon style={Config.styles.MidIcon} name="pin"/>
                            <Text style={styles.textStyle}>{this.formatterMaxString(this.props.address)}</Text>
                            <Icon style={Config.styles.MidIcon} name="arrow-down"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchStyle} onPress={()=>{ this.props.searchClick();}}>
                            <Icon style={Config.styles.MidIcon} name="search"/>
                            <Text style={styles.searchText}>请输入商品名称</Text>
                    </TouchableOpacity>
                </View>       */}
            </View>

        )
    }
}


export interface TopBannerProps {
    item: Array<any>,
    imageHeight: number,
    autoplay: boolean,
    indexClick: (linkurl: string) => void,
    indexChange: (index: number) => void,
}
export interface TopBannerState {
    currentIndex: number
}
export class    TopBanner extends React.Component<TopBannerProps, TopBannerState>{
    constructor(props: any) {
        super(props);
        this.state = {
            currentIndex: 1
        }
    }

    render() {
        let ImagCnt = this.props.item.length == 0 ? 1 : this.props.item.length;
        return (
            <View style={styles.container}>
                <Swiper width={screenWidth}
                    height={this.props.imageHeight}
                    autoplay={this.props.autoplay}
                    showsButtons={false}
                    showsHorizontalScrollIndicator
                    loop
                    showsPagination={false}
                    onIndexChanged={(index: number) => {
                        this.props.indexChange(index);
                    }}
                    onMomentumScrollEnd={() => {
                        let selectIndex: number = this.state.currentIndex + 1;
                        selectIndex = selectIndex > ImagCnt ? 1 : selectIndex;
                        this.setState({
                            currentIndex: selectIndex
                        });
                    }}
                >
                    {
                        this.props.item.map((url, index) => {
                            return <TouchableOpacity onPress={() => { }} key={index} >
                                <Image key={index} style={{ width: screenWidth, height: this.props.imageHeight, resizeMode: 'cover' }} source={{ uri: Config.DomainName + url }} />
                            </TouchableOpacity>

                        })
                    }

                </Swiper>

                <View style={styles.numberStyle}>
                    <Text>
                        {this.state.currentIndex}/{ImagCnt}
                    </Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    numberStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 50,
        height: 20,
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchText: {
        fontSize: Config.Font0875,
        color: Config.ColorW,
    },
    searchStyle: {
        marginTop: 25,
        position: 'absolute',
        backgroundColor: 'rgba(243,243,243,0.5)', 
        marginLeft: 200,
        marginRight: 10,
        height: Config.SearchHeight,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth / 2,
        borderRadius: 15
    },
    viewStyle: {
        marginTop: 15,
        position: 'absolute',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressStyle: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(243,243,243,0.4)', 
        borderRadius: 15, 
        height: Config.SearchHeight, 
        paddingLeft: 10, 
        width: screenWidth/2-30,
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 5,
    },
    swiperStyle: {
        width: screenWidth,
        height: 200
    }
});
