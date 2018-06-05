"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const feedback_1 = require("../actions/feedback");
const Feedback_1 = require("../components/Feedback");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return redux_1.bindActionCreators({
        feedback: feedback_1.feedback,
    }, dispatch);
};
const AddaddrContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Feedback_1.default);
exports.default = AddaddrContainer;
//# sourceMappingURL=FeedbackContainer.js.map