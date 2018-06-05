import {connect} from "react-redux"
import RootState from "../Store/Store";
import {default as Main, MainProps} from "../components/Main";

const mapStateToProps = (state:RootState):Partial<MainProps>=>{
    return {
        cartCount:state.entities.cart.carts.length,
        logged:!!(state.currentUser.logged)
    }
};
const mapDispatchToProps =(dispatch: any):Partial<MainProps>=>{
    return {}
};
const MainContainer = connect(mapStateToProps,mapDispatchToProps)(Main);

export default MainContainer