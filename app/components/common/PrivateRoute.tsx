import * as React from "react";
import {Component} from "react";
import {Route, RouteProps, Redirect} from "react-router";
import {LOGIN} from "../../constants/RouterDefine";

export interface PrivateRouteProperties extends Pick<RouteProps,"location"|"path"|"exact"|"strict">{
    component:React.ComponentClass<any>
    logged:boolean
}

export class PrivateRoute extends Component<PrivateRouteProperties>{
    render(){
        let props = {...this.props,component:undefined};
        let {component:Component,logged} = this.props;

        return (
            <Route {...props} render={props=>(
                logged?(
                    <Component {...props}/>
                ):(
                    <Redirect to={{pathname:LOGIN,state:{from:props.location}}}/>
                ))}>
            </Route>
        )
    }
}
