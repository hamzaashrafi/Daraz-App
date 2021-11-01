export { toast } from './toast';
export {
    setAppStorage,
    getAppStorage,
    removeAppStorage,
    removeAppStorageByKey,
} from './localstorage';


export const generateOrderId = () => {
    return 'Hamza-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r && 0x3) || 0x8);
        return v.toString(16);
    });
};

export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}