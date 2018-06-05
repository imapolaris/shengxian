import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import Category, {CategoryProps} from "../components/Category/Category";
import {fetchCategory, fetchCoupon, fetchMy, fetchItemDynamic, fetchSearch, clearSearch} from "../actions/CategoryAction";
import Coupon, {CouponProps} from "../components/Coupon";
import My, {MyProps} from "../components/My";
import Search, {SearchProps} from "../components/Search";
import SearchResult, {SearchResultProps} from "../components/SearchResult";
import ItemList, {ItemListProps} from "../components/ItemList";
import {addCartItem, editCartItem} from "../actions/cart";


const mapStateToProps = (state:RootState):Partial<CategoryProps>=>{
    // const shopId = state.currentUser.shopId
    // const saleItems = shopId && state.entities.sales[shopId] && state.entities.sales[shopId].saleItems || []
    // const shop = state.entities.shopList.shops.find((shop)=>shop.id===shopId)
    // const shopTitle = shop && shop.title || "";
    return {
        carts:state.entities.cart.carts,
		Category:state.entities.Category,
		ItemDynamic:state.entities.ItemDynamic,
    }
};

const mapDispatchToProps =(dispatch: any):Partial<CategoryProps>=>{
    return bindActionCreators({editCartItem,addCartItem,fetchCategory, fetchItemDynamic},dispatch)
};

const CategoryContainer = connect(mapStateToProps,mapDispatchToProps)(Category)

export default CategoryContainer

//my
const mapStateToPropsMy = (state:RootState):Partial<MyProps>=>{
    return {
		My:state.entities.My,
    }
};

const mapDispatchToPropsMy =(dispatch: any):Partial<MyProps>=>{
    return bindActionCreators({ fetchMy},dispatch)
};

export const MyContainer = connect(mapStateToPropsMy,mapDispatchToPropsMy)(My)

//Search
const mapStateToPropsSearch = (state:RootState):Partial<SearchProps>=>{
    return {
		Search:state.ui.Search,
    }
};

const mapDispatchToPropsSearch =(dispatch: any):Partial<SearchProps>=>{
    return bindActionCreators({ fetchSearch, clearSearch},dispatch)
};

export const SearchContainer = connect(mapStateToPropsSearch,mapDispatchToPropsSearch)(Search)

//SearchResult
const mapStateToPropsSearchResult = (state:RootState):Partial<SearchResultProps>=>{
    return {
		carts:state.entities.cart.carts,
        SearchResult:state.ui.SearchResult,
        itemDynamics:state.entities.ItemDynamic
    }
};

const mapDispatchToPropsSearchResult =(dispatch: any):Partial<SearchResultProps>=>{
    return bindActionCreators({ editCartItem,addCartItem},dispatch)
};

export const SearchResultContainer = connect(mapStateToPropsSearchResult,mapDispatchToPropsSearchResult)(SearchResult)


//ItemList
const mapStateToPropsItemList = (state:RootState):Partial<ItemListProps>=>{
    return {
		itemDynamics:state.entities.ItemDynamic
    }
};

const mapDispatchToPropsItemList =(dispatch: any):Partial<ItemListProps>=>{
    return bindActionCreators({ },dispatch)
};

export const ItemListContainer = connect(mapStateToPropsItemList,mapDispatchToPropsItemList)(ItemList)