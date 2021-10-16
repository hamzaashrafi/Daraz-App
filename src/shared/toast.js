import Toast from 'react-native-tiny-toast';

export const toast = (type, msg, duration = 6000) => {
    if (type === 'error') {
        Toast.show(msg, {
            position: 100,
            containerStyle: { margin: 10 },
            textStyle: { color: 'red' },
            duration: Toast.duration.LONG = duration
        });
    } else if (type === 'success') {
        Toast.showSuccess(msg);
    } else if (type === 'info') {
        Toast.show(msg, {
            position: 100,
            containerStyle: { margin: 10 },
            textStyle: { color: 'skyblue' },
            duration: Toast.duration.LONG = duration
        });
    } else if (type === 'warning') {
        Toast.show(msg, {
            position: 100,
            containerStyle: { margin: 10 },
            textStyle: { color: 'yellow' },
            duration: Toast.duration.LONG = duration
        })
    }
};