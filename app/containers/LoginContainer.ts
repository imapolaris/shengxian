import {connect} from "react-redux"
import RootState from "../Store/Store";
import Login, {LoginProps} from "../components/Login";
import {bindActionCreators} from "redux";
import {getVCode, login, loginWeChat} from "../actions/login";

const mapStateToProps = (state:RootState):Partial<LoginProps>=>{
    return {
        phone:state.currentUser.phone,
        msg_id:state.currentUser.msg_id,
        logged:state.currentUser.logged
    }
};

const mapDispatchToProps =(dispatch: any):Partial<LoginProps>=>{
    return bindActionCreators({login, getVCode,loginWeChat},dispatch)
};

const LoginContainer = connect(mapStateToProps,mapDispatchToProps)(Login);

export default LoginContainer