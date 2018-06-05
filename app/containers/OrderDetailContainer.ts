import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
import {default as OrderDetail, OrderDetailProps} from "../components/OrderDetail";
import {buyAgain} from "../actions/order";
import {cancelOrder} from "../actions/order";

const mapStateToProps = (state:RootState,props:OrderDetailProps):Partial<OrderDetailProps>=>{
    return {        
        // orders:state.entities.orders,
        //order:state.entities.orders[props.match.params.key]
    }
};

 const mapDispatchToProps =(dispatch: any):Partial<OrderDetailProps>=>{
     return bindActionCreators({
		 cancelOrder,
		 buyAgain
     },dispatch)
 };
const OrderDetailContainer = connect(mapStateToProps,mapDispatchToProps)(OrderDetail)

export default OrderDetailContainer