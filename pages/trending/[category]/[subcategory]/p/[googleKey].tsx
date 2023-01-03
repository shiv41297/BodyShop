import React from 'react';
import { getProductData } from '../../../../../component/components/productDetail/action';
import ProductDetails from '../../../../../component/components/productDetail/index';
import { wrapper } from '../../../../../store/store';

function ProductDetail() {
  return (
    <div>
      <ProductDetails />
    </div>
  );
}

export default ProductDetail;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    await store.dispatch(getProductData());

    return { props: {} };
  }
);
