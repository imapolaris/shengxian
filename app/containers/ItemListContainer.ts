import {connect} from "react-redux"
import RootState from "../Store/Store";
// import {addItemCount, checkItem, removeItem, subItemCount} from "../actions/cart";
import {default as ItemList, ItemListProps} from "../components/ItemList";

const mapStateToProps = (state:RootState):Partial<ItemListProps>=>{
    return {
    }
};

const mapDispatchToProps =(dispatch: any):Partial<ItemListProps>=>{
    return{}
};

const ItemListContainer = connect(mapStateToProps,mapDispatchToProps)(ItemList)

export default ItemListContainer