import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {default as Addrlist, AddrlistProps} from "../components/Addrlist";
import {fetchAddrList} from "../actions/addrlist";
import {setSubmitOrderAddr, setUiAddr} from "../actions/ui";
import {updateLocation} from "../actions/location";

const mapStateToProps = (state:RootState):Partial<AddrlistProps>=>{
    return {
        addrs:state.entities.addrs,
    }
};

const mapDispatchToProps =(dispatch: any):Partial<AddrlistProps>=>{
    return bindActionCreators({
        fetchAddrList,
        setUiAddr,
        updateLocation,
        setSubmitOrderAddr
    },dispatch)
};

const AddrlistContainer = connect(mapStateToProps,mapDispatchToProps)(Addrlist);

export default AddrlistContainer