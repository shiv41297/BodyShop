import Utils from '../../../utils';
import { searchProducts } from '../../../utils/event/action';
import request from '../../../utils/request';
// import { hideLoader, hideSkeleton } from "../home/actions";

export function getProductList(params: any) {
  // params: any,
  // filter: boolean
  // callback?: Function,
  // mobile?: any
  // callBack1?: any
  return async (dispatch: any, getState: any) => {
    //static
    // let params = { page: 1, limit: 18, urlKey: "new-in", query: "" };
    let token = params.authToken;

    let data = {
      ...params,
      categoryId: params && params.categoryId ? params.categoryId : 65,
      query: '',
    };
    let searchQuery = params.query;
    let url =
      Utils.endPoints.PRODUCT_LIST +
      '?data=' +
      encodeURIComponent(JSON.stringify(data));
    let str = encodeURI(url);

    const resp = await request
      .get(str, { headers: { Authorization: 'Bearer ' + token } })
      .catch((err) => {
        console.log(err, 'error');
      });

    let respdata: any = resp?.data?.data ? { ...resp?.data?.data } : {};
    // if (mobile?.data && data?.products?.data?.length > 0)
    //   data.products.data = [...mobile.data, ...data?.products?.data];
    respdata = { ...respdata };
    // if (filter)
    dispatch({
      type: 'product-filter',
      payload: resp?.data?.data?.filters?.data,
    });
    // if (callback) {
    //   callback(resp);
    // }
    dispatch({
      type: 'getProductList',
      payload: { ...respdata },
    });

    return;

    request.get(str).then((resp) => {
      // request.post(url,data).then((resp) => {

      let data: any = resp?.data?.data ? { ...resp?.data?.data } : {};
      // if (mobile?.data && data?.products?.data?.length > 0)
      //   data.products.data = [...mobile.data, ...data?.products?.data];
      data = { ...data };
      // if (filter)
      dispatch({
        type: 'product-filter',
        payload: resp?.data?.data?.filters?.data,
      });
      // if (callback) {
      //   callback(resp);
      // }
      dispatch({
        type: 'getProductList',
        payload: { ...data },
      });

      if (searchQuery) {
        let NoOfOutofStock = data.products.data?.filter((item: any) => {
          if (item?.type == 'configurable') {
            return item?.configurableProductLinks?.some(
              (val: any) => !val?.isInStock
            );
          } else return !item.isInStock;
        })?.length;

        let eventPayload = {
          SearchKey: searchQuery,
          NoOfSearchResults: data.products.data?.length,
          NoOfOutofStock,
          FromScreen: 'Search',
          ClickBehaviour: 'Search Result',
        };
        searchProducts(eventPayload);
      }
    });
    // .catch((err: any) => {
    //   if (callBack1) {
    //     callBack1();
    //     if (err?.response?.data?.message)
    //       dispatch({
    //         type: "show-alert",
    //         payload: {
    //           type: "error",
    //           message: err.response.data.message,
    //         },
    //       });
    //   } else {
    //     // dispatch(hideLoader());
    //     // dispatch(hideSkeleton());

    //     if (err?.response?.data?.message)
    //       dispatch({
    //         type: "show-alert",
    //         payload: {
    //           type: "error",
    //           message: err.response.data.message,
    //         },
    //       });
    //   }
    // });
  };
}

// export function getProductList(params: any,authtoken: any) {
//   // params: any,
//   // filter: boolean
//   // callback?: Function,
//   // mobile?: any
//   // callBack1?: any
//   return async (dispatch: any, getState: any) => {
//     //static
//     // let params = { page: 1, limit: 18, urlKey: "new-in", query: "" };
//     let token = params.authToken;
//     const actionparams = {
//       // customAttributes: [],
//       // otherFilters: [],
//       page: 1,
//       query: '',
//       // sortBy: "2",
//       urlKey: params.query?.slug,

//     };

//     let filter = {categoryId: params && params.search && params.search.categoryId ? params.search.categoryId : "" , query: params && params.search && params.search.query ? params.search.query : ""}

//   //  filterDataToken = {...filterData};
//     let data = { ...actionparams, ...filter };
//     let searchQuery = params.query;
//     // let url =
//     //   Utils.endPoints.PRODUCT_LIST +
//     //   "?data=" +
//     //  data;
//     //   "?data=" +
//     //   data)

//     let url =
//     Utils.endPoints.PRODUCT_LIST +
//     "?data=" +
//     encodeURIComponent(JSON.stringify(data));
//     let str = encodeURI(url);

//     // let url =
//     // Utils.endPoints.PRODUCT_LIST +
//     // "?data=" + data

//     // let str = encodeURI(url);

//     const resp = await request.get(str,{ headers : {"Authorization" : "Bearer " + authtoken}}).catch((err) => {
//       console.log(err, "error");
//     });

//     let respdata: any = resp?.data?.data ? { ...resp?.data?.data } : {};
//     // if (mobile?.data && data?.products?.data?.length > 0)
//     //   data.products.data = [...mobile.data, ...data?.products?.data];
//     respdata = { ...respdata };
//     // if (filter)
//     dispatch({
//       type: "product-filter",
//       payload: resp?.data?.data?.filters?.data,
//     });
//     // if (callback) {
//     //   callback(resp);
//     // }
//     dispatch({
//       type: "getProductList",
//       payload: { ...respdata },
//     });

//     return;

//     request.get(str).then((resp) => {
//       // request.post(url,data).then((resp) => {

//       let data: any = resp?.data?.data ? { ...resp?.data?.data } : {};
//       // if (mobile?.data && data?.products?.data?.length > 0)
//       //   data.products.data = [...mobile.data, ...data?.products?.data];
//       data = { ...data };
//       // if (filter)
//       dispatch({
//         type: "product-filter",
//         payload: resp?.data?.data?.filters?.data,
//       });
//       // if (callback) {
//       //   callback(resp);
//       // }
//       dispatch({
//         type: "getProductList",
//         payload: { ...data },
//       });

//       if (searchQuery) {
//         let NoOfOutofStock = data.products.data?.filter((item: any) => {
//           if (item?.type == "configurable") {
//             return item?.configurableProductLinks?.some(
//               (val: any) => !val?.isInStock
//             );
//           } else return !item.isInStock;
//         })?.length;

//         let eventPayload = {
//           SearchKey: searchQuery,
//           NoOfSearchResults: data.products.data?.length,
//           NoOfOutofStock,
//           FromScreen: "Search",
//           ClickBehaviour: "Search Result",
//         };
//         searchProducts(eventPayload);
//       }
//     });
//     // .catch((err: any) => {
//     //   if (callBack1) {
//     //     callBack1();
//     //     if (err?.response?.data?.message)
//     //       dispatch({
//     //         type: "show-alert",
//     //         payload: {
//     //           type: "error",
//     //           message: err.response.data.message,
//     //         },
//     //       });
//     //   } else {
//     //     // dispatch(hideLoader());
//     //     // dispatch(hideSkeleton());

//     //     if (err?.response?.data?.message)
//     //       dispatch({
//     //         type: "show-alert",
//     //         payload: {
//     //           type: "error",
//     //           message: err.response.data.message,
//     //         },
//     //       });
//     //   }
//     // });
//   };
// }

export function getPLPCategories(params?: any) {
  return request.get(Utils.endPoints.PLP_CATEGORY, {
    params: { limit: 20, page: 1, ...params },
  });
}
