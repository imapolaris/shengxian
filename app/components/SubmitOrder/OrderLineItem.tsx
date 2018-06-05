/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';


export interface OrderLineItemProps {
    height: number
}
export interface OrderLineItemState{
}

export default class OrderLineItem extends React.Component<OrderLineItemProps, OrderLineItemState>{
    render() {
        const {height} = this.props;
        return (
            <View style={[styles.container, { height: height}]} />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },

});
