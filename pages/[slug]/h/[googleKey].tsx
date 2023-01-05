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
    await store.dispatch(getProductList());
    return { props: {} };
  }
);
