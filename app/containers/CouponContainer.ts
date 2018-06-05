import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import Coupon, {CouponProps} from "../components/Coupon";
import {setCouponSelect, setSubmitOrderCoupon} from "../actions/ui";
import {fetchCoupon} from "../actions/CategoryAction"

const mapStateToProps = (state:RootState):Partial<CouponProps>=>{
    return {
        Coupon:state.entities.Coupon,
    }
};

const mapDispatchToProps =(dispatch: any):Partial<CouponProps>=>{
    return bindActionCreators({
        setCouponSelect,
        fetchCoupon,
        setSubmitOrderCoupon
    },dispatch)
};

const CouponContainer = connect(mapStateToProps,mapDispatchToProps)(Coupon);

export default CouponContainer