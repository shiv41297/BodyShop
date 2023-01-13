import React from 'react';
import { wrapper } from '../../../store/store';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import ProductListing from '../../../component/components/screens/productListing';
import { getProductList } from '../../../component/components/screens/productListing/action';

function ProductListingWrapper() {
  const productData = useSelector((state: any) => state.productReducer?.data);
  return (
    <>
      {productData && (
        <Head>
          <title>
            {productData?.categoryData && productData?.categoryData?.metaTitle
              ? productData?.categoryData?.metaTitle
              : productData?.categoryData?.name
              ? `${productData?.categoryData?.name} | The Body Shop`
              : 'The Body Shop'}
          </title>
          <meta
            name="description"
            content={
              productData?.categoryData &&
              productData?.categoryData?.metaDescription
                ? productData?.categoryData?.metaDescription
                : 'The Body Shop'
            }
          />
          {/* <link rel="canonical" href={window.location.href} /> */}
        </Head>
      )}
      <ProductListing />
    </>
  );
}

export default ProductListingWrapper;

// export const getServerSideProps = wrapper.getServerSideProps((store) =>
//   //@ts-ignore-
//   async ({ req, res, query, params }) => {
//     // let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0"

//     await store.dispatch(getProductList(params,req.cookies.authToken));
//     return { props: {} };
//   }
// );

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res, query, params }) => {
    // let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2M2EzZWQyYTQ2YWRlMzM4OGRlNjQ4YTkiLCJpc0xvZ2luIjp0cnVlLCJpc0d1ZXN0TG9naW4iOnRydWUsImlhdCI6MTY3MTY4NzQ2NiwiZXhwIjoxNjg3MjM5NDY2fQ.4Eg19HCDEGFUiw562m2nxA7T5WPHZb6bt0yZwfx6Xo0"

    const actionparams = {
      // customAttributes: [],
      // otherFilters: [],
      page: 1,
      query: '',
      // sortBy: "2",
      urlKey: query?.slug,
      categoryId: '',
      // authToken: authToken
      authToken: req.cookies.authToken,
    };

    await store.dispatch(getProductList(actionparams));

    return { props: {} };
  }
);
