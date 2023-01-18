import React from "react";
import { wrapper } from "../../../store/store";
import Head from "next/head";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ProductListing from "../../../component/components/screens/productListing";
import { getProductList } from "../../../component/components/screens/productListing/action";
import request from "../../../component/utils/request";
import Utils from "../../../component/utils";
import Headers from "../../../component/components/headers";

function ProductListingWrapper() {
  const productData = useSelector((state: any) => state.productReducer?.data);
  return (
    <Box>
    <Headers />
    <Box sx={{ marginTop: "130px" }}>
      {productData && (
        <Head>
          <title>
            {productData?.categoryData && productData?.categoryData?.metaTitle
              ? productData?.categoryData?.metaTitle
              : productData?.categoryData?.name
              ? `${productData?.categoryData?.name} | The Body Shop`
              : "The Body Shop"}
          </title>
          <meta
            name="description"
            content={
              productData?.categoryData &&
              productData?.categoryData?.metaDescription
                ? productData?.categoryData?.metaDescription
                : "The Body Shop"
            }
          />
          {/* <link rel="canonical" href={window.location.href} /> */}
        </Head>
      )}
      <ProductListing />
      </Box>
    </Box>
  );
}

export default ProductListingWrapper;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query, params }) => {
    let resp = await request.post(Utils.endPoints.GUEST_SIGNUP);
    let authToken: any = "";
    if (resp) {
      authToken = resp?.data?.data?.authToken;
      await store.dispatch(getProductList(query, req.cookies.authToken));
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
