import * as React from "react";
import {Header,Input,Spinner,Item,Button,Icon} from 'native-base';
import {Text} from "react-native";
import {ADDRLIST, SEARCH, MAIN} from "../constants/RouterDefine";
import {RouteComponentProps} from "react-router"

export interface LocationHeaderProps extends Partial<RouteComponentProps<any>>{        
    locate?:string,         //当前位置
    onLocation?:()=>void
}

export default class LocationHeader extends React.Component<LocationHeaderProps>{
    render(){
        return (
        <Header style={{justifyContent:"flex-start",alignItems:"center"}}>
            {this.props.locate?
                <Button iconLeft transparent style={{paddingHorizontal:0}} onPress={()=>{this.props.history&&this.props.history.push(ADDRLIST, {from:MAIN})}}>
                    <Icon name="pin"/>
                    <Text>{this.props.locate}</Text>
                    <Icon name="arrow-dropdown"/>
                </Button>:
                <Button iconLeft transparent style={{paddingHorizontal:0}}>
                    <Icon name="pin"/>
                    <Spinner/>
                    <Icon name="arrow-dropdown"/>
                </Button>
            }
            <Item bordered rounded style={{flex:1}}>
                <Icon name="search"/>
                <Input style={{paddingVertical:2}} onFocus = {()=>{this.props.history&&this.props.history.push(SEARCH)}}/>
            </Item>
        </Header>);
    }
}