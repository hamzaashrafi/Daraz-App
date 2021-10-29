import { types } from '../actionTypes';
import auth from '@react-native-firebase/auth'
import { toast } from '../../shared';
import { httpRequest } from '../../config';

export const signout = () => async (dispatch) => {
    console.log('Sign Out');
    try {
        await auth().signOut();
        dispatch({ type: types.SING_OUT });
    }
    catch (error) {
        console.log('signout error', error.message);
        toast('error', error.reason || error.message);
    }
};

export const signup = (payload) => async (dispatch) => {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(payload.email, payload.password);
        if (!user.emailVerified) {
            try {
                await auth().currentUser.sendEmailVerification(null);
                toast("info", "Please check your email for verification step");
                dispatch({ type: types.AUTH_FILED });
            } catch (error) {
                toast("error", "Error durring send verification email" + error.message);
            }
        }
    } catch (error) {
        console.log('error', error.message);
        toast('error', error.reason || error.message);
    }
};

export const signin = (payload) => async (dispatch) => {
    try {
        const { user } = await auth().signInWithEmailAndPassword(payload.email, payload.password);
        if (!user.emailVerified) {
            toast("info", "Email not varified");
            await user.sendEmailVerification(null);
        }
    } catch (error) {
        console.log('error', error.message);
        if (error.message === "We have blocked all requests from this device due to unusual activity. Try again later.") {
            toast("error", 'Email Not Varified');
        } else {
            toast("error", error.message || error);
        }
    }
};

export const createUserInDatabase = (payload) => async (dispatch) => {
    try {
        dispatch({ type: types.AUTH_START });
        const response = await httpRequest.post('auth/signup', payload)
        console.log("signup Response", response.data);
        if (response.data.code) {
            throw response.data
        } else {
            dispatch({ type: types.AUTH_SUCCESS, user: response.data });
        }
    } catch (error) {
        console.log('createUserInDatabase error', error,message);
        toast('error', error.message ? error.message : 'Prosess Failed');
        dispatch({ type: types.AUTH_FILED });
    }
};

export const updateUser = (payload, headers) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_USER_START });
        const response = await httpRequest.post('user/update', payload, { headers })
        console.log("updateUser", response.data);
        if (response.data.code) {
            throw response.data
        } else {
            dispatch({ type: types.UPDATE_USER_SUCCESS, user: response.data });
        }
    } catch (error) {
        console.log('updateUser error', error);
        toast('error', error.message ? error.message : 'Prosess Failed');
        dispatch({ type: types.UPDATE_USER_FILED });
    }
};

export const resetSigninUserState = (user) => (dispatch) => {
    dispatch(createUserInDatabase({ email: user.email, name: user.displayName || user.email.split('@')[0] }));
};