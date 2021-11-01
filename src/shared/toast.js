// import Toast from 'react-native-tiny-toast';
import { ToastAndroid } from "react-native";

export const toast = (type, msg, duration = 6000) => {
    ToastAndroid.showWithGravity(msg, duration,
        ToastAndroid.BOTTOM,
        25,
        50
    )
    ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );

    // console.log(type, msg)
    // if (type === 'error') {
    //     Toast.show(msg, {
    //         position: 1,
    //         containerStyle: { margin: 10 },
    //         textStyle: { color: 'red' },
    //         duration: Toast.duration.LONG = duration
    //     });
    // } else if (type === 'success') {
    //     Toast.showSuccess(msg);
    // } else if (type === 'info') {
    //     Toast.show(msg, {
    //         position: 1,
    //         containerStyle: { margin: 10 },
    //         textStyle: { color: 'skyblue' },
    //         duration: Toast.duration.LONG = duration
    //     });
    // } else if (type === 'warning') {
    //     Toast.show(msg, {
    //         position: 1,
    //         containerStyle: { margin: 10 },
    //         textStyle: { color: 'yellow' },
    //         duration: Toast.duration.LONG = duration
    //     })
    // }
};
