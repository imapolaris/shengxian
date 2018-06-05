import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {startAliPay, startDaoFuPay, startWeChatPay} from "../actions/ui";
import Pay, {PayProps} from "../components/Pay";

const mapStateToProps = (state:RootState):Partial<PayProps>=>{
    return {}
};

const mapDispatchToProps =(dispatch: any):Partial<PayProps>=>{
    return bindActionCreators({
        startAliPay,
        startWeChatPay,
        startDaoFuPay
    },dispatch)
};

const PayContainer = connect(mapStateToProps,mapDispatchToProps)(Pay);

export default PayContainer