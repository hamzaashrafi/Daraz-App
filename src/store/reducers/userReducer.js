import { types } from '../actionTypes';

// initeat State
let initialState = {
    user: {},
    isUserExist: false,
    isUserGetting: false
};

function userReducer(state = initialState, action) {
    switch (action.type) {

        case types.AUTH_START:
            return { ...state, isUserGetting: true };
        case types.AUTH_SUCCESS:
            return { ...state, user: action.user, isUserExist: true, isUserGetting: false };
        case types.AUTH_FILED:
            return { ...state, isUserGetting: false };

        case types.UPDATE_USER_START:
            return { ...state, };
        case types.UPDATE_USER_SUCCESS:
            return { ...state, user: action.user };
        case types.UPDATE_USER_FILED:
            return { ...state, };

        case types.GET_FAVORITE_PRODUCTS_OF_USER:
            return { ...state, user: action.user };

        case types.SING_OUT:
            return { ...state, user: {}, isUserExist: false };

        default:
            return state;
    }
}

export default userReducer;
