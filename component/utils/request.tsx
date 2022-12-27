import axios from "axios"
import { isAuthenticated, getAuthToken,  isGuestUser } from "./session"
import Utils from ".";
import { v4 as uuidv4 } from 'uuid';
import { hideLoader } from "../state/actions/homeActions";
import { store } from "../state/store/store";

const initstore = store;

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`
});


// Set config defaults when creating the instancep
const check = Utils.CommonFunctions?.getCookie("deviceId") != "" &&
    Utils.CommonFunctions?.getCookie("deviceId") != undefined &&
    Utils.CommonFunctions?.getCookie("deviceId") !== null;
let deviceId = check ?
    Utils.CommonFunctions?.getCookie("deviceId") :
    uuidv4();
console.log("request", Utils.CommonFunctions?.getCookie('deviceId'))

if (!check) {
    Utils.CommonFunctions?.setCookie('deviceId', deviceId)
}

instance.defaults.headers.common['language'] = 'en';
instance.defaults.headers.common['offset'] = '-330';
instance.defaults.headers.common['deviceid'] = deviceId;
instance.defaults.headers.common['platform'] = 'web';


// Add a request interceptor
instance.interceptors.request.use(
    (success : any) => {
        if (!success.headers.common['Authorization']) {
            if (isAuthenticated() || isGuestUser()) {
                success.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
            } else {
                success.headers.common['Authorization'] = `Basic ${process.env.REACT_APP_API_KEY}`;
            }
        }
        if (!success.headers.common['deviceid']) {
            let deviceId = uuidv4();
            success.headers.common['deviceid'] = deviceId
            Utils.CommonFunctions.setCookie('deviceId', deviceId)
        }


        return success;
    },
    (error) => {
        return Promise.reject(error);

    }
);


// Add a request interceptor
instance.interceptors.response.use(
    (success) => {
        return success;
    },
    (err) => {
        if (err.response.status === 503) { //under maintainance
            initstore.dispatch({ type: "undermaintainance", payload: { undermaintainance: 1 } })
            initstore.dispatch(hideLoader())
        }
        else {
            initstore.dispatch({ type: "undermaintainance", payload: { undermaintainance: 0 } })
            
            // if (!window.navigator.onLine) {
            //     initstore.dispatch(hideLoader())
            //     initstore.dispatch({
            //         type: "show-alert",
            //         payload: {
            //             type: "error",
            //             message: "You are offline. Please check internet connection",
            //         },
            //     })
            //     return;
            // } else if (err.response.status === Utils.statusCode.UNAUTHENTICATED) {
            //     removeSession();
               
            // }

        }
        return Promise.reject(err);
    }
);


// Alter defaults after instance has been created

export default instance