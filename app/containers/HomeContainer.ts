import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import RootState from "../Store/Store";
import Home, {HomeProps} from "../components/HomePage/Home";
import {fetchTopbanner, fetchSaleItem} from "../actions/homeaction";
import {editCartItem, addCartItem, fetchCarts} from "../actions/cart";
import {startGpsLocation} from "../actions/location";
import {fetchItemDynamic} from "../actions/CategoryAction";

const mapStateToProps = (state:RootState):Partial<HomeProps>=>{
    const shopId = state.currentUser.temp.shopId;
    const shop = state.entities.shopList.shops.find((shop)=>shop.id===shopId);
    const shopTitle = shop && shop.name || "";
    return {
		topBanner:state.entities.topBanner,
		saleItem:state.entities.SaleItem,
        width:state.ui.layout.width,
        items:state.entities.items,
        carts:state.entities.cart,
        itemDynamics:state.entities.ItemDynamic,
        locate:state.currentUser.temp.location,
        shopId,
        shopTitle,
        logged:(state.currentUser.logged || false)
    }
};

const mapDispatchToProps =(dispatch: any):Partial<HomeProps>=>{
    return bindActionCreators({editCartItem,addCartItem,fetchCarts, fetchTopbanner, fetchSaleItem,startGpsLocation,fetchItemDynamic},dispatch)
};

const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(Home);
export default HomeContainer