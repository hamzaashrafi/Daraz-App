import { httpRequest } from '../../config';
import { types } from '../actionTypes';

export const createProduct = (payload) => async (dispatch) => {
    try {
        const createProduct = await httpRequest.post('product/create', payload)
        console.log('createProduct', createProduct);
    }
    catch (error) {
        console.log('signout error', error.message);
        toast('error', error.reason || error.message);
    }
};

export const getProducts = (payload) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PRODUCTS_START });
        const getProducts = await httpRequest.post('product/get', payload)
        console.log('getProducts', getProducts.data);
        dispatch({ type: types.GET_PRODUCTS_SUCCESS, product_list: getProducts.data });
    }
    catch (error) {
        dispatch({ type: types.GET_PRODUCTS_FILED });
        console.log('signout error', error.message);
        toast('error', error.reason || error.message);
    }
};