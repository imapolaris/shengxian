import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import AMap, {AMapProps} from "../components/AMap";
import {updateLocation as locationAction} from "../actions/location";
import {changeAddrLocation, updateUiAddr as updateUI} from "../actions/ui";
import AMapSearch from "../components/AMapSearch";

const mapStateToProps = (state:RootState):Partial<AMapProps>=>{
    return {
        currentLocation:state.currentUser.temp.location,
        uiData:state.ui.amap
    }
};

const mapDispatchToProps =(dispatch: any):Partial<AMapProps>=>{
    let updateLocation = bindActionCreators(locationAction,dispatch);
    let changeAddr=bindActionCreators(changeAddrLocation,dispatch);
    let updateUiAddr=bindActionCreators(updateUI,dispatch);

    return {updateLocation,updateUiAddr}
};

const AMapContainer = connect(mapStateToProps,mapDispatchToProps)(AMap);
export const AMapSearchContainer = connect(mapStateToProps,mapDispatchToProps)(AMapSearch);

export default AMapContainer