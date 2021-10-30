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