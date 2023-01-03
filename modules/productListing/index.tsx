import { useEffect } from "react";
import { screenViewed } from "../../component/utils/event/action";
import events from "../../component/utils/event/constant";
/**
 * Components
 */
import Banner from "./banner";
import FilterProducts from "./filterProducts";
import MobileMenu from "./mobileMenu";
import MobileFilterProducts from "./mobileFilterProducts";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
// import { ReducersModal } from "../../models";

const ProductListing = () => {
  // const params: any = useParams();
  const params: any = 123;

  const URLPath = useSelector(
    (state: any) => state.productReducer?.data?.categoryData?.urlPath
  );
  let keyword = params?.keyword ?? "";

  const theme = useTheme();

  useEffect(() => {
    /**
     * Event logger
     */
    const URLPathArray = URLPath && URLPath.split("/");

    if (URLPathArray && URLPathArray.length > 1) {
      screenViewed({
        ScreenName: events.SCREEN_SUB_CATEGORY_PLP,
        CTGenerated: "WEB",
      });
    } else {
      screenViewed({
        ScreenName: keyword ? events.SCREEN_PLP_SEARCH : events.SCREEN_PLP,
        CTGenerated: "WEB",
      });
    }
  }, [URLPath]);

  return (
    <div id={"banner-id"}>
      <h1>Product Listing</h1>
      {/* {theme.breakpoints.up("sm") ? !keyword && <MobileMenu /> : null} */}
      {/* {!keyword && <Hidden smUp></Hidden>} */}
      {/* <Banner /> */}
      {/* {theme.breakpoints.down("xs") ? <FilterProducts /> : null} */}

      {/* <Hidden xsDown></Hidden> */}

      {/* {theme.breakpoints.up("sm") ? <MobileFilterProducts /> : null} */}

      {/* <ListProducts /> */}
    </div>
  );
};

export default ProductListing;
