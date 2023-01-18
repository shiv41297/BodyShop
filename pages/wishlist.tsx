import React from "react";
import { Box } from "@mui/material";
import Wishlist from "../component/components/screens/wishlist";
import { wrapper } from "../store/store";
import Headers from "../component/components/headers";
import request from "../component/utils/request";
import Utils from "../component/utils";
import Cookies from "js-cookie";
const WishList = () => {
  return (
    <Box>
      <Headers />
      <Box sx={{ marginTop: "130px" }}>
        <Wishlist />
      </Box>
    </Box>
  );
};

export default WishList;
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    let obj: any = {
      limit: 10,
      page: 1,
    };
    let url = Utils.CommonFunctions.replaceUrlParams(
      Utils.endPoints.MENU_LIST,
      obj
    );
    /* HEADER MENU API */
    const menuResponse = await request.get(url, {
      headers: {
        Authorization: `Bearer ${req.cookies["authToken"]}`,
      },
    });
    let menuRespData = menuResponse?.data?.data.filter(
      (value: any, _index: number) => value.id !== null
    );
    store.dispatch({
      type: Utils.ActionName.MENU_DATA,
      payload: { menuData: menuRespData },
    });
    // ---------------------------------------- //
    return { props: {} };
  }
);
