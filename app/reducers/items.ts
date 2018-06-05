import {initItems, Item} from "../store/EntitiesState";
import {Action} from "../common/utils/action";
import {NumberMap} from "../common/utils/types";

/**
 * 商品列表
 */
export const itemsReducer  =(state:NumberMap<Item>=initItems, action:Action<any>)=> {
    return state;
}