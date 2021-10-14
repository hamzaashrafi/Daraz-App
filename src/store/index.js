import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    userReducer,
    productsReducer
} from './reducers';
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.


export default createStore(
    combineReducers({
        users: userReducer,
        products: productsReducer,
    }),
    {}, // empty obj for action
    applyMiddleware(thunk));
