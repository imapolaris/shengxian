import {connect} from "react-redux"
import RootState from "../Store/Store";
import {bindActionCreators} from "redux";
import SubmitOrder, {SubmitOrderProps} from "../components/SubmitOrder";
import {setSubmitOrderMemo, setSubmitOrderTime} from "../actions/ui";
import {newOrder} from "../actions/order";

const mapStateToProps = (state:RootState):Partial<SubmitOrderProps>=>{
    return {
        ui:state.ui.submitOrder,
        coupons:state.entities.Coupon.data,
        itemDynamics:state.entities.ItemDynamic
    }
};

const mapDispatchToProps =(dispatch: any):Partial<SubmitOrderProps>=>{
    return bindActionCreators({
         setSubmitOrderTime,
        setSubmitOrderMemo,
        newOrder
     },dispatch)
};

const SubmitOrderContainer = connect(mapStateToProps,mapDispatchToProps)(SubmitOrder);

export default SubmitOrderContainer