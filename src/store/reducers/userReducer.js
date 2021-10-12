import { types } from '../actionTypes';

// initeat State
let initialState = {
    user: {},
    isUserExist: false,
};

function userReducer(state = initialState, action) {
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

export default userReducer;
