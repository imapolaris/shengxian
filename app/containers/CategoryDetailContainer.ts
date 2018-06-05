import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import {default as CategoryDetail, CategoryDetailProps} from "../components/Category/CategoryDetail";
import {addCartItem, editCartItem} from "../actions/cart";
const mapStateToProps = (state:RootState,props:CategoryDetailProps):Partial<CategoryDetailProps>=>{
    return {        
        carts:state.entities.cart.carts
    }
};

const mapDispatchToProps =(dispatch: any):Partial<CategoryDetailProps>=>{
    return bindActionCreators({
        editCartItem,
        addCartItem
        },dispatch)
};

const CategoryDetailContainer = connect(mapStateToProps,mapDispatchToProps)(CategoryDetail);
export default CategoryDetailContainer