import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {clearCacheData, logout} from "../actions/ui";
import {default as Setup, SetupProps} from "../components/Setup";

const mapStateToProps = (state:RootState):Partial<SetupProps>=>{
    return {}
};

const mapDispatchToProps =(dispatch: any):Partial<SetupProps>=>{
    return bindActionCreators({
        clearCacheData,
        logout
    },dispatch)
};

const SetupContainer = connect(mapStateToProps,mapDispatchToProps)(Setup);

export default SetupContainer