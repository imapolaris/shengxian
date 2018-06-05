import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {
    feedback
} from "../actions/feedback";
import Feedback, {FeedbackProps} from "../components/Feedback";
import {setAMapOpType, updateUiAddr} from "../actions/ui";

const mapStateToProps = (state:RootState):Partial<FeedbackProps>=>{
    return {
  
    }
};

const mapDispatchToProps =(dispatch: any):Partial<FeedbackProps>=>{
    return bindActionCreators({
        feedback,
    },dispatch)
};

const AddaddrContainer = connect(mapStateToProps,mapDispatchToProps)(Feedback);

export default AddaddrContainer