import Utils from "../../component/utils";
import request from "../../component/utils/request";
import ActionName from "../../component/utils/actionName";
import axios from "axios";

export function showSkeleton() {
  return {
    type: ActionName.SKELETON_LOADING,
    payload: { skeletonLoader: true },
  };
}
export function hideSkeleton() {
  return {
    type: ActionName.SKELETON_LOADING,
    payload: { skeletonLoader: false },
  };
}

export function showLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: true } };
}
export function hideLoader() {
  return { type: ActionName.LOADING, payload: { isLoading: false } };
}

export function showPaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: true } };
}
export function hidePaytmCallbackLoader() {
  return { type: ActionName.LOADING, payload: { paytmLoader: false } };
}

export const getConfig = (payload: any) => {
  return (dispatch: any, _setState: any) => {
    request.get(Utils.endPoints.CONFIG, { params: payload }).then((resp) => {
      if (payload.configCode === "general") {
        // localStorage.setItem("underMaintenance", resp.data.data.underMaintenance)
        dispatch({
          type: "setConfig",
          payload: { generalConfigs: resp.data.data },
        });
      } else {
        dispatch({
          type: "setConfig",
          payload: { paymentConfigs: resp.data.data },
        });
      }
    });
  };
};

export const getLatestReviews = (query: string) => {
  return request.get(Utils.endPoints.LATEST_REVIEWS + query);
};

const filterDataForWeb = (data: any) => {
  const webData = data.filter(
    (obj: any) => obj.ui_type === "web" || obj.ui_type === "both"
  );
  return webData;
};
const filterDataForMobile = (data: any) => {
  const mobileData = data.filter(
    (obj: any) => obj.ui_type === "mobile" || obj.ui_type === "both"
  );
  return mobileData;
};

export const getHomeData = () => async (dispatch: any) => {
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0",
      deviceid: "a6bb3f72-f91f-46b4-82f2-0a588995c4bb",
      language: "en",
      offset: "-330",
      platform: "web",
    },
  };
  // let url = Utils.endPoints.HOME;
  let url =
    "https://bodyshopstgapi.appskeeper.in/user-service/api/v1/users/page/home";
  
  let resp = await axios.get(url, config);
  if (resp) {
    console.log(resp, "resp");
    const data = [...resp?.data?.data];
    // web home data
    // const arr = convertObjToArray(data)
    const webData = filterDataForWeb(data);
    const sortedData = webData.sort((a: any, b: any) => {
      return Number(a.position) - Number(b.position)
    })
    dispatch({
      type: "getHomeData",
      payload: sortedData,
    });
  }
};
// }


export const getRatingData = (query: string, callback: Function) => {
  return (dispatch: any, _getState: any) => {
    let url = Utils.endPoints.RATE_ORDERS;
    request
      .get(url + query)
      .then((resp) => {
        if (callback) {
          callback(resp?.data?.data);
        }
      })
      .catch((_err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
      });
  };
};

export const getTopSearch = () => {
  let url = Utils.endPoints.TOP_SEARCH;
  return request.get(url);
};
export const userSearch = (params: any) => {
  let url = Utils.endPoints.USER_SEARCH;
  return request.get(url, { params });
};
