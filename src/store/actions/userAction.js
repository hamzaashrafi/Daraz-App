import { types } from '../actionTypes';
import firebase from 'firebase/app';
import { auth, database } from '../../config';
import { toast } from '../../shared';

export const signout = () => async (dispatch) => {
    try {
        await auth.signOut();
        dispatch({ type: types.SING_OUT });
        // window.location.reload();
    }
    catch (error) {
        toast('error', error.reason || error.message);
    }
};

export const signup = (payload) => async (dispatch) => {
    dispatch({ type: types.AUTH_START });
    try {
        const { user } = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
        if (!user.emailVerified) {
            try {
                await auth.currentUser.sendEmailVerification(null);
                toast("info", "Please check your email for verification step");
                dispatch({ type: types.AUTH_FILED });
            } catch (error) {
                toast("error", "Error durring send verification email" + error.message);
            }
        } else {
            console.log('user', user);
            dispatch({ type: types.AUTH_SUCCESS });
        }
    } catch (error) {
        dispatch({ type: types.AUTH_FILED });
        toast("error", error.message);
    }
};

export const signin = (payload) => async (dispatch) => {
    dispatch({ type: types.AUTH_START });
    try {
        const { user } = await auth.signInWithEmailAndPassword(payload.email, payload.password);
        if (!user.emailVerified) {
            dispatch({ type: types.AUTH_FILED });
            // await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
            await user.sendEmailVerification(null);
            // dispatch({ type: types.AUTH_FILED });
        } else {
            dispatch({ type: types.AUTH_SUCCESS });
            console.log('user', user);
        }
    } catch (error) {
        dispatch({ type: types.AUTH_FILED });
        if (error.message === "We have blocked all requests from this device due to unusual activity. Try again later.") {
            toast("error", 'Email Not Varified');
        } else {
            toast("error", error.message || error);
        }
        // console.error("Error signing in with password and email", error);
    }
};
