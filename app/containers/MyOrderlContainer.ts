import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
import {default as MyOrder, MyOrderProps} from "../components/MyOrder";
import {fetchOrder, cancelOrder, delOrder,buyAgain} from "../actions/order";
import {changeMyOrderTab} from "../actions/ui";

const mapStateToProps = (state:RootState):Partial<MyOrderProps>=>{
    return {        
        orders:state.entities.orders,
        loading:state.http.loading,
        ui:state.ui.myOrder
    }
};

const mapDispatchToProps =(dispatch: any):Partial<MyOrderProps>=>{
    return bindActionCreators({
        fetchOrder,
        changeMyOrderTab,
        cancelOrder,
        delOrder,
        buyAgain,
    },dispatch)
};

const MyOrderlContainer = connect(mapStateToProps,mapDispatchToProps)(MyOrder)

export default MyOrderlContainer