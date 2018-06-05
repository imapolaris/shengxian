import {initShopStorages, ShopStorage} from "../store/EntitiesState";
import {Action} from "../common/utils/action";
import {NumberMap} from "../common/utils/types";

/**
 * 门店库存
 */
export const shopStorageReducer  =(state:NumberMap<ShopStorage>=initShopStorages, action:Action<any>)=> {
    return state;
}
