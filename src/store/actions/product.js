import { httpRequest } from '../../config';
import { getAppStorage, removeAppStorageByKey, setAppStorage, toast } from '../../shared';
import { types } from '../actionTypes';

export const createProduct = (payload) => async (dispatch) => {
    try {
        const createProduct = await httpRequest.post('product/create', payload)
        // console.log('createProduct', createProduct);
    }
    catch (error) {
        console.log('createProduct', error.message);
        toast('error', error.reason || error.message);
    }
};

export const getProducts = (payload) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PRODUCTS_START });
        const getProducts = await httpRequest.post('product/get', payload)
        // console.log('getProducts', getProducts.data);
        dispatch({ type: types.GET_PRODUCTS_SUCCESS, product_list: getProducts.data });
    }
    catch (error) {
        dispatch({ type: types.GET_PRODUCTS_FILED });
        console.log('getProducts', error.message);
        toast('error', error.reason || error.message);
    }
};

export const onSelectProduct = (product) => async (dispatch) => {
    dispatch({ type: types.ON_SELECT_PRODUCT, product });
}

export const onAddToCart = (product, action = "+", showToast) => async (dispatch) => {
    try {
        const cartData = await getAppStorage('cartData') || []
        const index = cartData.findIndex(item => item._id === product._id)
        if (index === -1) {
            cartData.unshift({ ...product, qty: 1 })
        } else {
            if (action === '+') {
                cartData[index].qty = cartData[index].qty + 1
            } else {
                console.log('cartData[index].qty', cartData[index].qty);
                console.log('cartData[index].qty <= 0', cartData[index].qty > 1);
                if (cartData[index].qty > 1) {
                    cartData[index].qty = cartData[index].qty - 1
                }
            }
        }
        setAppStorage('cartData', cartData)
        dispatch({ type: types.ADD_TO_CART, cartData });
        if (!showToast) toast('success', 'Add to cart success')
    } catch (error) {
        console.log('onAddToCart', error.message || error)
        toast('error', error.reason || error.message);
    }
}

export const removeCartData = () => async (dispatch) => {
    try {
        await removeAppStorageByKey('cartData')
        dispatch({ type: types.REMOVE_CART_DATA });
        toast('success', 'Cart Empty')
    } catch (error) {
        console.log('removeCartData', error.message || error)
        toast('error', error.reason || error.message);
    }
}

export const removeProductInCartData = (productId) => async (dispatch) => {
    try {
        const cartData = await getAppStorage('cartData') || []
        const index = cartData.findIndex(item => item._id === productId)
        const pro = cartData[index]
        cartData.splice(index, 1)
        setAppStorage('cartData', cartData)
        dispatch({ type: types.ADD_TO_CART, cartData });
        toast('success', `Remove ${pro.name} success`)
    } catch (error) {
        console.log('removeProductInCartData', error.message || error)
        toast('error', error.reason || error.message);
    }
}

export const getCartDate = (products) => async (dispatch) => {
    try {
        dispatch({ type: types.ADD_TO_CART, cartData: products });
    } catch (error) {
        console.log('getCartDate', error.message || error)
        toast('error', error.reason || error.message);
    }
}

