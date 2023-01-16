import React from "react";
import { useNavigate } from "react-router-dom";
import Utils from "../../../utils";
import CustomButton from "../../../components/common/button";
import { Box } from "@mui/material";

interface Props {
  activeStep: number;
  classes: any;
  handleBack: Function;
  handleNext: Function;
  error: string;
  selectedAmount: number;
  donationAmount: number;
  handleCheckout: Function;
}
const RightContent: React.FC<Props> = ({
  activeStep,
  classes,
  handleBack,
  handleNext,
  error,
  selectedAmount,
  handleCheckout,
}: Props) => {
  const history = useNavigate();


  return (
    <div className={classes.btnContainer}>
      {activeStep !== 4 ? (
        <>
          {activeStep === 0 ? (
           <Box sx={{ display: { xs: "none", sm: "block", width: "100%" } }}>
              <div className={classes.btnDiv}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={"Cancel"}
                  onClick={() => history(Utils.routes.GIFT_CARD,{   state: { pageName: "Gift Card" } })
                  }
                />
              </div>
           </Box>
          ) : (
           <Box sx={{ display: { xs: "none", sm: "block", width: "100%" } }}>
              <div className={classes.btnDiv}>
                <CustomButton
                  type="button"
                  color="primary"
                  fullWidth
                  variant="outlined"
                  text={"Back"}
                  onClick={handleBack}
                />
              </div>
           </Box>
          )}
          <>
           <Box sx={{ display: { xs: "none", sm: "block", width: "100%" } }}>
              <div className={classes.btnDiv}>
                <CustomButton
                  disabled={error ? true : false}
                  type="button"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={"Next"}
                  onClick={handleNext}
                />
              </div>
           </Box>
           <Box sx={{ display: { xs: "block", sm: "none", width: "100%" } }}>
              <div className={classes.btnDiv}>
                <CustomButton
                  disabled={error ? true : false}
                  type="button"
                  color="primary"
                  fullWidth
                  variant="contained"
                  text={"Continue"}
                  onClick={handleNext}
                />
              </div>
           </Box>
          </>
        </>
      ) : (
        <>
         <Box sx={{ display: { xs: "none", sm: "block", width: "100%" } }}>
            <div className={classes.backButton}>
              <CustomButton
                type="button"
                color="primary"
                fullWidth
                variant="outlined"
                text={"Back"}
                onClick={handleBack}
              />
            </div>
         </Box>

          <div className={classes.checkOutBtn}>
            <CustomButton
              type="button"
              color="primary"
              fullWidth
              variant="contained"
              // text={`Continue & Pay ₹ ${selectedAmount ? Utils.CommonFunctions.addCommaToAmount(selectedAmount + donationAmount) : 0
              //   }`}
              text={`Continue & Pay ₹ ${selectedAmount ? Utils.CommonFunctions.addCommaToAmount(selectedAmount) : 0
              }`}
              onClick={handleCheckout}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default RightContent;
