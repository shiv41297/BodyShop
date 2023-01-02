import axios from "axios";
import { isAuthenticated, getAuthToken, isGuestUser } from "./session";
import Utils from ".";
import { v4 as uuidv4 } from "uuid";

// import { hideLoader } from "../components/pagesComponents/home/actions";
// import { initStore } from "../../store/store";

// const initstore = initStore;


// const setAuthorization = (token) => {

//   api.interceptors.request.use((config) => {
//     config.headers.Authorization = 'Bearer ' + token;
//     return config;
//   });

// }

// console.log(setAuthorization,"authorization")

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

// Set config defaults when creating the instancep
const check =
  Utils.CommonFunctions?.getCookie("deviceId") != "" &&
  Utils.CommonFunctions?.getCookie("deviceId") != undefined &&
  Utils.CommonFunctions?.getCookie("deviceId") !== null;
let deviceId = check ? Utils.CommonFunctions?.getCookie("deviceId") : uuidv4();

if (!check) {
  Utils.CommonFunctions?.setCookie("deviceId", deviceId);
}

instance.defaults.headers.common["language"] = "en";
instance.defaults.headers.common["offset"] = "-330";
instance.defaults.headers.common["deviceid"] = deviceId;
instance.defaults.headers.common["platform"] = "web";
instance.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0";


  // Add a request interceptor

// instance.interceptors.request.use(
//   (success: any) => {
//     if (!success.headers.common["Authorization"]) {
//       if (isAuthenticated() || isGuestUser()) {
//         // success.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;
//         success.headers.common["Authorization"] =
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0";
     
//         } else {
//         success.headers.common[
//           "Authorization"
//         ] = `Basic ${process.env.NEXT_PUBLIC_API_KEY}`;
      
//       }
//     }
//     if (!success.headers.common["deviceid"]) {
//       let deviceId = uuidv4();
//       success.headers.common["deviceid"] = deviceId;
//       Utils.CommonFunctions.setCookie("deviceId", deviceId);
//     }

//     return success;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a request interceptor
instance.interceptors.response.use(
  (success) => {
    return success;
  },
  (err) => {
    // if (err.response.status === 503) { //under maintainance
    //     initstore.dispatch({ type: "undermaintainance", payload: { undermaintainance: 1 } })
    //     initstore.dispatch(hideLoader())
    // }
    // else {
    //     initstore.dispatch({ type: "undermaintainance", payload: { undermaintainance: 0 } })

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
    return err;
  }
  // return Promise.reject(err);
  // }
);

// Alter defaults after instance has been created

export default instance;
