import * as React from 'react';
import {StyleSheet, ScrollView, Dimensions, Platform, Image, DeviceEventEmitter} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title , Text, Form, Item, Label,Input , Button,Thumbnail,Icon,CardItem,Card, View,
    Grid, Col, Row, Tabs, Tab, TabHeading, ListItem, Switch, List} from 'native-base';
import {RouteComponentProps, withRouter} from "react-router"

import {ComHeader, ComHeaderBtn} from "./ComHeader";
const  ComHeaderWithRouter= withRouter(ComHeader);

export interface OrderEnterInfoProp extends RouteComponentProps<any>{
}
export interface OrderEnterInfoState{
}
export default class OrderEnterInfo extends React.Component<OrderEnterInfoProp,OrderEnterInfoState>{
    constructor(props:any){
        super(props);

    }

    componentDidMount() {

    }

    render(){

        return(
            <Container style={styles.container}>
                <ComHeaderWithRouter title="填写订单"/>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },

});