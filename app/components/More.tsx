import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';

// import {Util} from "../common/utils/util";
import {SETUP, HELP, LOGIN, SUBMITORDER, FEEDBACK} from "../constants/RouterDefine";
import {RouteComponentProps, withRouter} from "react-router";
import {ComHeader, ComHeaderBtn} from "./ComHeader";
import MyStatusBar from "./MyStatusBar";
const  ComHeaderWithRouter= withRouter(ComHeader);

const pichead = {uri:"screen"}


export const shead = StyleSheet.create({
    head:{ backgroundColor: "#fff", height: 80 },
    body:{ justifyContent:"center",flexDirection:"row" },    
    fonttxt: {color:'#000', fontSize:20 },
    fonticon: {color:'#000', fontSize:40 },
})
//f4f4f4
export const saddr = StyleSheet.create({
    bk3:{backgroundColor:'#f3f3f3', flex:1, flexDirection:'row', paddingTop:10},
    btn:{backgroundColor:'#fff', flex:1, margin:1},
    btn3:{backgroundColor:'#fff',height:80, flex:1,flexDirection:'column', margin:1},  
    fonticon: {color:'#000', fontSize:30},
    
})

export interface MoreProps extends RouteComponentProps<any>{        
}
export interface MoreState{
}
export default class More extends React.Component<MoreProps,MoreState>{
    constructor(props:any){
        super(props)
    }
    render() {
        return (
            <Container>
            <MyStatusBar />
{/* 头部 */}
            <ComHeaderWithRouter title="更多"/> 
{/* 下面 */}
 
                <View style={[saddr.bk3]}>
						<Button      light style = {saddr.btn3} onPress={()=>{this.props.history.push(FEEDBACK)}} >
                            <Icon name="chatboxes" style={[saddr.fonticon, {color:'mediumaquamarine'}]} />
                            <Text>意见反馈</Text>
                        </Button>
                        <Button      light style = {saddr.btn3} onPress={()=>{this.props.history.push(HELP)}} >                                
                            <Icon name="help-circle" style={[saddr.fonticon, {color:'orange'}]}  />
                            <Text>帮助中心</Text>
                        </Button>
                        <Button      light style = {saddr.btn3} onPress={()=>{this.props.history.push(SETUP)}}>                            
                            <Icon name="settings" style={[saddr.fonticon, {color:'#50be07'}]} />
                            <Text>设置中心</Text>
                        </Button>
                        <Button      light style = {saddr.btn3}>                            
                            <Icon name="people" style={[saddr.fonticon, {color:'#50be07'}]}  />
                            <Text>关于我们</Text>
                        </Button>                   
                </View> 


            </Container>
        );
    }
}