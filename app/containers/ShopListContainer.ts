import {connect} from "react-redux"
import RootState from "../Store/Store";
import {ShoplistProps} from "../components/Shoplist";
import Shoplist from "../components/Shoplist";
import {changeShop} from "../actions/location";
import {bindActionCreators} from "redux";

const mapStateToProps = (state:RootState):Partial<ShoplistProps>=>{
    return {
        shops:state.entities.shopList.shops
    }
};

const mapDispatchToProps =(dispatch: any):Partial<ShoplistProps>=>{
    return bindActionCreators({
        changeShop
    },dispatch)
};

const ShoplistContainer = connect(mapStateToProps,mapDispatchToProps)(Shoplist);

export default ShoplistContainer