import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {startGpsLocation} from "../actions/location";
import ErrorPage, {ErrorPageProps} from "../components/ErrorPage";

const mapStateToProps = (state:RootState):Partial<ErrorPageProps>=>{
    return {location:state.currentUser.temp.location}
};

const mapDispatchToProps =(dispatch: any):Partial<ErrorPageProps>=>{
    return bindActionCreators({startGpsLocation},dispatch)
};

const ErrorPageContainer = connect(mapStateToProps,mapDispatchToProps)(ErrorPage);
export default ErrorPageContainer