import { types } from '../actionTypes';

// initeat State
let initialState = {
    cartData: [],
    categories: [
        { key: 'electronics', title: 'Electronics' },
        { key: 'cars', title: 'Cars' },
        { key: 'mobile', title: 'Mobile' },
        { key: 'clothes', title: 'Clothes' },
        { key: 'groceries', title: 'Groceries' },
        { key: 'aaaaaa', title: 'cccccc' },
    ],
    product_list: [],
    selectedProduct: {},
    isProductGetting: false
};

function productsReducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_PRODUCTS_START:
            return { ...state, isProductGetting: true };
        case types.GET_PRODUCTS_SUCCESS:
            return { ...state, product_list: action.product_list, isProductGetting: false };
        case types.GET_PRODUCTS_FILED:
            return { ...state, isProductGetting: false };

        case types.ON_SELECT_PRODUCT:
            return { ...state, selectedProduct: action.product };

        case types.ADD_TO_CART:
            return { ...state, cartData: action.cartData };

        case types.REMOVE_CART_DATA:
            return { ...state, cartData: [] };

        default:
            return state;
    }
}

export default productsReducer;
