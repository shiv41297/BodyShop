import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import Utils from "../../utils";
import React, { useEffect, useState } from "react";
// import MobileHeader from "./mobileHeader";
// import { useNavigate, useLocation } from "react-router-dom";
import request from "../../utils/request";
import MiniHeader from "./miniHeader";
import { ReducersModal } from "../../models";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";

import { Badge, Box } from "@mui/material";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
import MessageDialogue from "../../common/product/messageDialogue";
import { showSkeleton, getHomeData, hideSkeleton, showLoader, hideLoader } from "../../state/actions/homeActions";
import { isAuthenticated } from "../../utils/session";
import SearchIndex from "../searchModal";
// import {
//   CART,
//   HEART_FILLED,
//   LOGO,
//   PROFILE,
//   SEARCH,
//   LOCATION,
// } from "utils/constantImages";

// import { getUserProfile } from "../../pages/account/profile/action";
// import { getDashboardData } from "../../pages/account/lybc/action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stickyHeader: {
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: theme.zIndex.appBar,
    },
    headerRoot: {
      backgroundColor: "var(--primary)",
      padding: theme.spacing(1, 2),
      // zIndex: theme.zIndex.appBar,
    },
    gridContainer: {
      margin: theme.spacing(0, "auto"),
      maxWidth: "var(--max-width)",
    },

    leftStores: {
      display: "flex",
      alignItems: "center",
    },
    locationImg: {
      width: 15,
      cursor: "pointer",
    },
    stores: {
      color: "var(--white)",
      marginLeft: theme.spacing(1),
      cursor: "pointer",
    },
    centerLogo: {
      textAlign: "center",
    },
    rightIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    Img: {
      cursor: "pointer",
      display: "inline-block",
    },
    badge: {
      color: "var(--white)",
      "& .MuiBadge-badge": {
        fontSize: 15,
        top: -5,
        right: -2,
      },
    },
    messageHeading: {
      font: `normal 700 ${theme.spacing(2.0)}px Work Sans`,
      color: "var(--black300)",
      lineHeight: "28px",
      marginBottom: "9px",

      // margin: theme.spacing(0.8, 0),
    },
    cursor: {
      cursor: "pointer",
    },
  })
);

const Headers = () => {
  const classes = useStyles();
  const history = useRouter();
  // const location = useLocation();
  const [open, setOpen] = React.useState(false);
  // const [mobileMenus, setMobileMenus] = React.useState([]);
  const [loginAlert, showLoginAlert] = useState(false);
  const dispatch: any = useDispatch();

  const pathname = history?.pathname || "";
  useEffect(() => {
    if (
      !pathname.includes("/p/") &&
      !pathname.includes("/c/") &&
      !pathname.includes("/h/")
    )
      dispatch({ type: "mobile-applied-filters", payload: null });
  }, [pathname]);

  const shoppingBagReducer = useSelector((state: ReducersModal) => {
    return state.shoppingBagReducer;
  });
  let totalItems = 0;
  const items = shoppingBagReducer?.items || [];
  items?.map((item: any) =>
    item.visibility !== 1 ? (totalItems += item.quantity) : totalItems
  );
  // const isMembershipAdded = shoppingBagReducer?.isMembershipAdded;
  // totalItems = isMembershipAdded ? totalItems + 1 : totalItems;
  totalItems = shoppingBagReducer?.freeProductCount
    ? shoppingBagReducer.totalItems - shoppingBagReducer?.freeProductCount
    : totalItems;
  const totalCount = useSelector(
    (state: ReducersModal) => state.wishlistReducer?.totalCount
  );
  const { authToken } = useSelector(
    (state: ReducersModal) => state.homeReducer
  );
  const menuData = useSelector(
    (state: ReducersModal) => state.homeReducer.menuData
  );

  const handleSuggestionClick = (item: any) => {
    dispatch({ type: "mobile-applied-filters", payload: null });
    setOpen(false);
    let url = `${Utils.CommonFunctions.replaceUrlParams(
      ROUTE_CONSTANTS.PRODUCT_SEARCH_LIST,
      { ":keyword": item }
    )}?isSearched=true`;
    history.push(url);
    // history.push(`productss`)
  };

  const handleProductClick = (item: any, type: "search" | "trending") => {
    setOpen(false);

    dispatch({ type: "mobile-applied-filters", payload: null });
    if (type == "search") {
      history.push({ pathname: `/${item.url}`, search: "?isSearched=true" });
    } else if (type == "trending") {
      let pathname = `${Utils.CommonFunctions.seoUrl(item, "pdp")}`;
      history.push({ pathname, search: "?isSearched=true" });
    }
  };
  const [menusData, setMenusData] = React.useState(menuData);

  let obj: any = {
    limit: 10,
    page: 1,
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (authToken) {
      if (!menuData.length) {
        let url = Utils.CommonFunctions.replaceUrlParams(
          Utils.endPoints.MENU_LIST,
          obj
        );
        request
          .get(url)
          .then((resp) => {
            let menuRespData = resp.data.data.filter(
              (value: any, _index: number) => value.id !== null
            );
            setMenusData(menuRespData);
            dispatch({
              type: Utils.ActionName.MENU_DATA,
              payload: { menuData: menuRespData },
            });
          })
          .catch((_err) => {});
      }
      // getPLPCategories()
      //   .then((resp) => {

      //     setMobileMenus(resp?.data?.data?.data);
      //   })
      //   .catch((err) => {
      //   });
    }
  }, [authToken]);

  

  const redirectToHome = () => {
    dispatch(showSkeleton());
    dispatch(
      getHomeData(() => {
        dispatch(hideSkeleton());
      })
    );
    history.push("/");
  };
  function getDashboardData(): any {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <MessageDialogue
        cancelText={"Cancel"}
        okText={"Okay"}
        open={loginAlert}
        handleClose={() => showLoginAlert(!loginAlert)}
        onOk={() => {
          history.push(`${ROUTE_CONSTANTS.LOGIN_OTP}`);
          showLoginAlert(false);
        }}
        message={"Please login to proceed"}
        heading={"The Body Shop"}
        headingClass={classes.messageHeading}
      />
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <div className={classes.stickyHeader}>
          <div className={classes.headerRoot}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={3}>
                <div className={classes.leftStores}>
                  <div
                    className={classes.locationImg}
                    onClick={() => history.push(Utils.routes.STORE)}
                  >
                    {/* <LOCATION /> */}
                  </div>

                  <Typography
                    className={classes.stores}
                    variant="body1"
                    onClick={() => history.push(Utils.routes.STORE)}
                  >
                    STORES
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.centerLogo}>
                  <div className={classes.Img} onClick={redirectToHome}>
                    {/* <LOGO /> */}
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.rightIcon}>
                  <div className={classes.Img} onClick={() => setOpen(true)}>
                    {/* <SEARCH /> */}
                  </div>

                  <div>
                    <Badge badgeContent={totalCount} className={classes.badge}>
                      <span
                        className={classes.cursor}
                        onClick={() => {
                          if (isAuthenticated())
                            history.push(ROUTE_CONSTANTS.WISHLIST);
                          else showLoginAlert(true);
                        }}
                      >
                        {/* <HEART_FILLED /> */}
                      </span>
                    </Badge>
                  </div>

                  <div
                    className={classes.cursor}
                    // onClick={() => {
                    //   if (isAuthenticated()) {
                    //     dispatch(showLoader());
                    //     dispatch(getDashboardData());
                    //     dispatch(
                    //       getUserProfile(() => {
                    //         dispatch(hideLoader());
                    //         history.push(Utils.routes.MY_PROFILE);
                    //       })
                    //     );
                    //   } else if (location?.pathname !== "/login-via-otp") {
                    //     showLoginAlert(true);
                    //   }
                    // }}
                  >
                    {/* <PROFILE /> */}
                  </div>
                  <div>
                    <Badge badgeContent={totalItems} className={classes.badge}>
                      <span
                        className={classes.Img}
                        onClick={() => history.push("/shopping-bag")}
                      >
                        {/* <CART /> */}
                      </span>
                    </Badge>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {menusData.length ? <MiniHeader menuData={menusData} /> : null}
        </div>
      </Box>

      <SearchIndex
        open={open}
        onClose={() => setOpen(false)}
        handleSuggestionClick={handleSuggestionClick}
        handleProductClick={handleProductClick}
      />

      {/* <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileHeader handleClick={() => setOpen(true)} menuData={menusData} />
      </Box> */}
    </>
  );
};

export default Headers;
