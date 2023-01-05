import Utils from '../../utils';
import request from '../../utils/request';
import { getShoppingBagList } from '../../common/addToCart/action';
import {
  hideLoader,
  hideSkeleton,
  showLoader,
} from '../../../store/home/action';


export const getProductData =
  (req: any, params: any) => async (dispatch: any) => {
    let url = Utils.endPoints.PRODUCT_DATA;
    let { category, subcategory, googleKey } = params;
    // console.log({params})
    // googleKey = googleKey ? googleKey : 64;
    // console.log( category, subcategory, googleKey,"<===googleKey",params);

    // https://bodyshopstgapi.appskeeper.in/product-service/api/v1/products?subcategoryId=8&urlKey=aloe-soothing-day-cream-config
    // let resp = await request.get(
    //   // 'https://bodyshopstgapi.appskeeper.in/product-service/api/v1/products?subcategoryId=8&urlKey=aloe-soothing-day-cream-config'
    //   `https://bodyshopstgapi.appskeeper.in/${Utils.endPoints.PRODUCT_DATA}?subcategoryId=${categoryId}&urlKey=${urlKey}`
    //   );
     
    let resp = await request.get(
      `https://bodyshopstgapi.appskeeper.in/${Utils.endPoints.PRODUCT_DATA}?subcategoryId=${googleKey}&urlKey=${subcategory}`
      );
    if (resp) {
      var product = resp?.data?.data;
      var selectedVariant = null;
      var selectedVariantData: any = null;
      if (product?.type === 'configurable') {
        const links = product?.configurableProductLinks?.sort(
          (a: any, b: any) => a?.price - b?.price
        );
        selectedVariantData =
          links?.find((item: any) => item.isInStock) ||
          product?.configurableProductLinks[0];
        const values = product?.configurableProductOptions?.[0]?.values;
        selectedVariant = values.find(
          (item: any) =>
            item?.label?.toLowerCase() ===
            selectedVariantData?.value?.toLowerCase()
        );
      } else {
        selectedVariantData = product;
      }
      dispatch({
        type: 'getProductData',
        payload: {
          ...product,
          selectedVariant,
          selectedVariantData,
        },
      });
    }
  };

export const addToBag = (payload: any) => {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.ADD_TO_BAG;
    request
      .post(url, payload)
      .then((resp) => {
        if (resp) dispatch(hideLoader());
        // dispatch({
        //   type: 'addToCart',
        //   payload: resp.data.data
        // });
        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "success",
        //     message: "Product added to Bag successfully"
        //   }
        // })
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
        // dispatch({
        //   type: 'addToCart',
        //   payload: "Unable to add"
        // });
      });
  };
};

export function storePriceInformation(params: any, dispatch: any) {
  let data = { priceData: params };
  dispatch({
    type: 'storePriceInformation',
    payload: data,
  });
}

export function addCompleteYourRoutine(params: any) {
  let data: any = params;
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.CommonFunctions.replaceUrlParams(
      Utils.endPoints.ADD_ROUTINE,
      data
    );
    request
      .post(url, data)
      .then((resp) => {
        if (resp) {
          if (resp.status === 201) {
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
            dispatch(getShoppingBagList());
          }
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}

export function checkStock(status: any, dispatch: any) {
  dispatch({
    type: 'checkStock',
    payload: status,
  });
}

export function checkPincode(value: any) {
  return request.post(Utils.endPoints.CHECK_PINCODE, value);
}

export function getReviews(params: any, callback?: Function) {
  return async (dispatch: any) => {
    let url = Utils.endPoints.REVIEWS + params;
    request
      .get(url)
      .then((resp) => {
        dispatch({
          type: 'product-reviews',
          payload: {
            ...resp.data.data,
          },
        });
        if (callback) callback(resp?.data?.data);
      })
      .catch((_err) => {
        dispatch(hideLoader());
        dispatch(hideSkeleton());
        // dispatch({
        //   type: "show-alert", payload: {
        //     type: "error",
        //     message: "Product not found"
        //   }
        // })
        // dispatch({
        //   type: 'productNotFound'
        // });
      });
  };
}

export function submitQuestionsPoll(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.QUESTIONS_POLL;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}

export function submitReviewPoll(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.REVIEW_POLL;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}

export function submitReviewReport(params: any, callback?: Function) {
  return (dispatch: any, _getState: any) => {
    dispatch(showLoader());
    let url = Utils.endPoints.REVIEW_REPORT;
    request
      .post(url, params)
      .then((resp) => {
        if (resp) {
          if (resp?.data?.message)
            dispatch({
              type: 'show-alert',
              payload: {
                type: 'success',
                message: resp.data.message,
              },
            });
          if (callback) callback();
        }
        dispatch(hideLoader());
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}

export function getRewardRate(callback?: Function) {
  return (dispatch: any) => {
    let url = Utils.endPoints.REWARD_POINT_RATE;
    request
      .get(url)
      .then((resp) => {
        if (callback) callback(resp?.data?.data);
      })
      .catch((err) => {
        dispatch(hideLoader());
        if (callback) callback();
        if (err?.response?.data?.message)
          dispatch({
            type: 'show-alert',
            payload: {
              type: 'error',
              message: err.response.data.message,
            },
          });
      });
  };
}
