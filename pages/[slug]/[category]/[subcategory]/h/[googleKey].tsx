import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Box } from "@mui/material";
import { PageMeta } from "../../../../../component/page-meta/PageMeta";
import ProductDetail from "../../../../../component/components/screens/productDetail/index";
import { wrapper } from "../../../../../store/store";
import { getProductData } from "../../../../../component/components/screens/productDetail/action";
import request from "../../../../../component/utils/request";
import Utils from "../../../../../component/utils";
import Headers from "../../../../../component/components/headers";

function MainProductDetail() {
  const productData: any = useSelector(
    (state: any) => state?.productDetailReducer
  );
  const metaTitle =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: "meta_title",
    });
  const metaDescription =
    productData &&
    productData.product &&
    _.find(productData.product.customAttributes, {
      attribute_code: "meta_description",
    });
  return (
    <Box>
      <Headers />
      <Box sx={{ marginTop: "130px" }}>
        {productData && productData.product && (
          <PageMeta
            title={`${
              metaTitle && metaTitle.value
                ? metaTitle.value
                : productData?.product?.name
                ? `${productData?.product?.name} | The Body Shop`
                : "The Body Shop"
            }`}
            description={
              metaDescription && metaDescription.value
                ? metaDescription.value
                : "The Body Shop"
            }
            // canonicalUrl={URL + props.location.pathname}
          />
        )}
        <ProductDetail />
      </Box>
    </Box>
  );
}

export default MainProductDetail;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, params }: any) => {
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = "";
    if (resp) {
      authToken = resp?.data?.data?.authToken;
      await store.dispatch(getProductData(params, authToken));
      let obj: any = {
        limit: 10,
        page: 1,
      };
      let url = Utils.CommonFunctions.replaceUrlParams(
        Utils.endPoints.MENU_LIST,
        obj
      );

      const menuResponse = await request.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      let menuRespData = menuResponse?.data?.data.filter(
        (value: any, _index: number) => value.id !== null
      );
      store.dispatch({
        type: Utils.ActionName.MENU_DATA,
        payload: { menuData: menuRespData },
      });

      return { props: {} };
    }
  }
);
