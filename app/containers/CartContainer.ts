import {connect} from "react-redux"
import RootState from "../Store/Store";
import {default as Cart, CartProps} from "../components/Cart/Cart";
import {bindActionCreators} from "redux";
import {selectCartsItems, setSubmitOrderItems, unSelectCartsItems} from "../actions/ui";
import {deleteCartItem, editCartItem, fetchCarts} from "../actions/cart";
import {fetchItemDynamic} from "../actions/CategoryAction";

const mapStateToProps = (state:RootState):Partial<CartProps>=>{
    return {
        items:state.entities.items,
        carts:state.entities.cart.carts,
        itemDynamics:state.entities.ItemDynamic,
        version:state.entities.cart.version,
        logined:(state.currentUser.token && state.currentUser.token.length > 0 || false),
        ui:state.ui.carts,
    }
};

const mapDispatchToProps =(dispatch: any):Partial<CartProps>=>{
    return bindActionCreators({
        selectCartsItems,
        editCartItem,
        fetchCarts,
        deleteCartItem,
        unSelectCartsItems,
        setSubmitOrderItems,
        fetchItemDynamic
    },dispatch)
};

const CartContainer = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default CartContainer