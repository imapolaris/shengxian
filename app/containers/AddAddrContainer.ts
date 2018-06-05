import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {
    addAddr, deleteAddr, editAddr,
} from "../actions/addrlist";
import Addaddr, {AddaddrProps} from "../components/Addaddr";
import {setAMapOpType, updateUiAddr} from "../actions/ui";

const mapStateToProps = (state:RootState):Partial<AddaddrProps>=>{
    return {
        addrState:state.ui.addAddr,
    }
};

const mapDispatchToProps =(dispatch: any):Partial<AddaddrProps>=>{
    return bindActionCreators({
        addAddr,
        editAddr,
        deleteAddr,
        setAMapOpType,
        updateUiAddr
    },dispatch)
};

const AddaddrContainer = connect(mapStateToProps,mapDispatchToProps)(Addaddr);

export default AddaddrContainer