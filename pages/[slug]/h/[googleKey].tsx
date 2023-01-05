import React from "react";
import ProductListing from "../../../modules/productListing";
import { wrapper } from "../../../store/store";
import {
  getProductList,
  getPLPCategories,
} from "../../../modules/productListing/action";

function ProductListingWrapper() {
  return <ProductListing />;
}

export default ProductListingWrapper;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query, params }) => {
    console.log(query, params);
    const actionparams = {
      // customAttributes: [],
      // otherFilters: [],
      page: 1,
      query: "",
      // sortBy: "2",
      urlKey: query?.slug,
    };

    console.log("actionParams", actionparams);
    await store.dispatch(getProductList(actionparams));
    return { props: {} };
  }
);
