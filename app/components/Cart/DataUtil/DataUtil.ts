import {Item} from "../../../store/EntitiesState";
import {CartItemKey} from "../../../common/constValue/ConstValue";
import DB from "../../../common/utils/Storage";

export interface CartSection {
    id: number,
    title: string,
    select: boolean
}
export interface CartItem {
    section: CartSection,
    item:Array<Item>,
}

/*获取购物车物品*/
export const getAllItem = ()=>{
    let promise = new Promise((resolve, reject) =>{
        DB.getValueForKey(CartItemKey).then((data)=>{
            resolve(data);
        });
    });
    return promise
}

/*更改物品数量*/
export const changeBuyCount = (sectionIndex: number, itemIndex: number, count: number)=>{

    let promise = new Promise((resolve, reject) =>{

        DB.getValueForKey(CartItemKey).then((data)=>{

            data[sectionIndex].item[itemIndex].usebuy = count;

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data).then();

            resolve(data);
        });
    });


    return promise

}

/*更改物品是否选中*/
export const changeItemCheck = (sectionIndex: number, itemIndex: number)=>{

    let promise = new Promise((resolve, reject) =>{

        DB.getValueForKey(CartItemKey).then((data)=>{

            data[sectionIndex].item[itemIndex].isCheck = !data[sectionIndex].item[itemIndex].isCheck;

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data).then();

            resolve(data);
        });
    });


    return promise

}

/*得到所有物品的总价格*/
export const getAllPrice = ()=>{

    let pricePromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            let allPrice: number = 0.00;
            // 选中的item，价格 * 数量
            data.map((cartitem: CartItem) => {
                if (cartitem.section.select) {
                    cartitem.item.map((item: Item) => {
                        if (item.isCheck) {
                            allPrice = allPrice + item.usebuy * item.price;
                        }
                    })
                }
            });

            resolve(allPrice);
        });
    })
    return pricePromise;
};

/*修改section是否选中*/
export const changeSectionCheck = (sectionIndex: number)=>{

    let checkPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            // section 的选中状态改变，则section 的所有 item 的选中状态都要改变
            // 和section 的选中状态保持一致
            data[sectionIndex].section.select = !data[sectionIndex].section.select;

            data[sectionIndex].item.map((obj: Item)=>{
                obj.isCheck = data[sectionIndex].section.select;
            });
            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data);

            resolve(data);
        });
    });
    return checkPromise;
};

/*所有的物品全部取消 选中 状态*/
export const setAllItemDisCheck = ()=>{

    let disCheckPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {
            data.map((item: CartItem)=>{
                item.section.select = false;
                item.item.map((obj: Item)=>{
                    obj.isCheck = false
                })
            });

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data);

            resolve(data);

        });
    });
    return disCheckPromise;
};
/*所有的物品全部 选中 状态*/
export const setAllItemCheck = ()=>{

    let CheckPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {
            data.map((item: CartItem)=>{
                item.section.select = true;
                item.item.map((obj: Item)=>{
                    obj.isCheck = true
                })
            });

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data);

            resolve(data);

        });
    });
    return CheckPromise;
};

/*删除所有选中的物品*/
export const deleteAllItemCheck = ()=>{

    let delCheckPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            let i = data.length;
            while(i--){
                if(data[i].section.select === true){
                    data.splice(i,1);
                }
            }

            data.map((obj: CartItem)=>{
                let i = obj.item.length;
                while(i--){
                    if(obj.item[i].isCheck === true){
                        obj.item.splice(i,1);
                    }
                }
            });

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, data);

            resolve(data);

        });
    });
    return delCheckPromise;
};

/*根据物品ID，查询在购物车中的数量*/
export const searchCountByIDFromCart = (itemID: number)=>{

    let CheckPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            let count:number = 0;
            data.map((item: CartItem)=>{
                item.item.map((obj: Item)=>{
                    if (obj.id === itemID){
                        count = obj.usebuy;
                    }
                })
            });
            resolve(count);

        });
    });
    return CheckPromise;
};


/*根据物品ID，添加到购物车*/
export const addItemToCartByID = (sectionID: number, itemID: number, item:Item, section: CartSection)=>{

    item.isCheck = true;

    let CheckPromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            let object = data;

            if (data) {
                let isHasSection = false;
                data.map((cartItem: CartItem, index: number)=>{

                    if (sectionID === cartItem.section.id){
                        // 这个门店在购物车里面有物品
                        let isHasItem = false; // 标记购物车里面是否有该物品
                        cartItem.item.map((obj: Item, i: number)=>{

                            if (obj.id === itemID){
                                // 物品已经在购物车里面存在,数量+1
                                object[index].item[i].usebuy = ++obj.usebuy;
                                isHasItem = true; // 有该物品，数量+1
                            }
                        })

                        // 没有该物品,将该物品添加到购物车
                        if (!isHasItem){
                            object[index].item.push(item);
                        }
                        isHasSection = true;
                    }
                });

                // 购物车里面没有改门店的物品,将该门店（门店包含物品），添加到购物车
                if (!isHasSection){
                    let newSection = {section: section, item: [item]};
                    object.push(newSection);
                }
            }else {

                object = [];
                // 购物车里面咩有数据
                let newSection = {section: section, item: [item]};
                object.push(newSection);
            }

            // 保存修改后的购物车数据到本地
            DB.saveValueForKey(CartItemKey, object);

            console.log('购物车数据：',object);

            resolve(true);

        });
    });
    return CheckPromise;
};


/*判断购物车是否有选中的物品*/
export const getSelectState = (data: any)=> {

    let promise = new Promise((resolve, reject) => {

        let aaa:boolean = false;

        data.map((cartItem: CartItem, index: number)=>{

            if (cartItem.section.select) {
                aaa = true
                return
            }
            cartItem.item.map((obj: Item, i: number)=>{
                if (obj.isCheck) {
                    aaa = true
                    return
                }

            })

        });
        if (aaa)
            resolve(1);

        resolve(0);

    });
    return promise;

}


/*返回购物车是选中的物品的数量*/
export const getSelectItemCount = ()=> {

    let pricePromise = new Promise((resolve, reject) => {
        DB.getValueForKey(CartItemKey).then((data) => {

            let selectCount: number = 0;
            // 选中的item，价格 * 数量
            data.map((cartitem: CartItem) => {
                cartitem.item.map((item: Item) => {
                    if (item.isCheck) {
                        ++selectCount;
                    }
                })

            });

            resolve({count: selectCount});
        });
    })
    return pricePromise;

}
