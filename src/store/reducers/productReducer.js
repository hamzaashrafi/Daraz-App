import { types } from '../actionTypes';

// initeat State
let initialState = {
    categories: [
        { key: 'electronics', title: 'Electronics' },
        { key: 'cars', title: 'Cars' },
        { key: 'mobile', title: 'Mobile' },
        { key: 'clothes', title: 'Clothes' },
        { key: 'groceries', title: 'Groceries' },
        { key: 'aaaaaa', title: 'cccccc' },
    ],
    product_list: []
};

function productsReducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_PRODUCTS_START:
            return { ...state, };
        case types.GET_PRODUCTS_SUCCESS:
            return { ...state, product_list: action.product_list };
        case types.GET_PRODUCTS_FILED:
            return { ...state, };

        default:
            return state;
    }
}

export default productsReducer;
