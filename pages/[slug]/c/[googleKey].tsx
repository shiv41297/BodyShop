import React from "react";
import ProductListing from "../../../modules/productListing";
import { wrapper } from "../../../store/store";
import {
  getProductList,
  getPLPCategories,
} from "../../../modules/productListing/action";

function ProductListingWrapper() {
  return <h1>Product Listing</h1>;
}

export default ProductListingWrapper;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    await store.dispatch(getProductList());
    return { props: {} };
  }
);
