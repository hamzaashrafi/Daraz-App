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
    product_list: [
        {
            name: 'Realme',
            image: '',
            description: 'Acha mobile hai lylo',
            price: '12000',
            discount: '100',
            category: 'Mobile',
        },
        {
            name: 'Civic',
            image: '',
            description: 'Acha Car hai lylo',
            price: '10000',
            discount: '200',
            category: 'Cars',
        },
        {
            name: 'Pants',
            image: '',
            description: 'Acha Pants hai lylo',
            price: '800',
            discount: '100',
            category: 'Clothes',
        },
        {
            name: 'Shirts',
            image: '',
            description: 'Acha Pants hai lylo',
            price: '8000',
            discount: '100',
            category: 'Clothes',
        },
        {
            name: 'Tv',
            image: '',
            description: 'Acha TV hai lylo',
            price: '12000',
            discount: '100',
            category: 'Electronics',
        },
        {
            name: 'Spons',
            image: '',
            description: 'Acha Spons hai lylo',
            price: '500',
            discount: '50',
            category: 'Groceries',
        },
    ]
};

function productsReducer(state = initialState, action) {
    switch (action.type) {

        case types.AUTH_START:
            return { ...state, };
        case types.AUTH_SUCCESS:
            return { ...state, user: action.user, isUserExist: true };
        case types.AUTH_FILED:
            return { ...state, };

        default:
            return state;
    }
}

export default productsReducer;
