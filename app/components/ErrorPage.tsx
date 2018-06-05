import * as React from 'react';
import {Image, ImageURISource, StyleSheet} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
import * as PropTypes from "prop-types";
import Permissions from "react-native-permissions"
import {PinLocation} from "../store/CurrentUserState";

export interface ErrorPageShowData{
    image:ImageURISource
    desc:string
    showOpenLocation:boolean
    showReLocation:boolean
    showReRequest:boolean
}

export interface ErrorPageProps{
    location:PinLocation
    startGpsLocation?:()=>void
}

export interface ErrorPageState{

}

export default class ErrorPage extends React.Component<ErrorPageProps,ErrorPageState>{
    static contextTypes={
        router:PropTypes.object
    };

    constructor(props:any,context: any){
        super(props,context);
        this.startGpsLocation = this.startGpsLocation.bind(this);
        this.openGpsLocation = this.openGpsLocation.bind(this);
        this.reload = this.reload.bind(this);
    }

    startGpsLocation(){
        this.props.startGpsLocation && this.props.startGpsLocation();
    }

    openGpsLocation(){

    }

    reload(){

    }

    componentDidMount(){

    }
    render() {
        let props:ErrorPageShowData = this.context.router.history.location.state;
        return (
            <Container style={styles.container}>
                <Image source={props.image}/>
                <Text>{props.desc}</Text>
                <View style={styles.buttons}>
                    {props.showOpenLocation?<Button onPress={this.openGpsLocation}><Text>开启定位</Text></Button>:null}
                    {props.showReLocation?<Button onPress={this.startGpsLocation}><Text>重新定位</Text></Button>:null}
                    {props.showReRequest?<Button onPress={this.reload}><Text>重新加载</Text></Button>:null}
                </View>
        </Container>
    );
    }
}

export const styles = StyleSheet.create({
    container:{ flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'},
    buttons:{ justifyContent:"center",flexDirection:"row" },
})