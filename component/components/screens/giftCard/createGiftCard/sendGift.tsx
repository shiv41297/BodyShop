import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import Utils from "../../../utils";
import {useNavigate } from "react-router-dom";
import CustomButton from "../../../components/common/button";
import { Box } from "@mui/material";
import { SEARCH_BACKGROUND } from "utils/constantImages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      // margin: theme.spacing(2, 8.5),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(2, 1.5, 0, 1.5),
      },
    },

    descContainer: {
      margin: theme.spacing(2, 0),
    },
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        2.4
      )} Recoleta Alt`,
      lineHeight: "33px",
      letterSpacing: "0.02em",
      color: "var(--secondary-black)",
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.6)} Recoleta Alt Bold`,
      },
    },
    description: {
      color: "var(--light-gray)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
        lineHeight: "22px",
      },
    },
    buyDescription: {
      color: "var(--white)",
      fontWeight: 400,
      fontFamily: "Work Sans",
      fontSize: 16,
      lineHeight: "25.6px",
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        font: `normal ${theme.spacing(1.4)} Work Sans Regular`,
        lineHeight: "22px",
        margin: theme.spacing(0),
      },
    },
    button: {
      borderRadius: 4,
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.4
      )} Work Sans`,
      textTransform: "capitalize",
      padding: theme.spacing(1, 2),
      letterSpacing: 0.6,
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        margin: 0,
        width: "100%",
      },
    },
    cardContainer: {
      alignItems: "stretch",
      display: "flex",
    },
    searchContainer: {
      background: `url(${SEARCH_BACKGROUND}) top left no-repeat`,
      padding: theme.spacing(2, 4),
      objectFit: "cover",
      backgroundColor: "#044236",
      borderRadius: 5,
      margin: theme.spacing(3, 0),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1.5, 0),
        padding: theme.spacing(1, 1.5),
      },
      alignItems: "center",
      backgroundSize: "cover",
    },
    searchHeading: {
      font: `normal ${theme.spacing(2.4)} Druk Bold`,
      color: "#D6CD56",
      lineHeight: "27.96px",
      textTransform: "uppercase",
      letterSpacing: "2px !important",
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
    searchButton: {
      border: "1px solid white",
      borderradius: "4px",
      color: "white",
      padding: "20px !important",
      font: `normal 600 ${theme.spacing(1.6)} Work Sans !important`,
      lineHeight: "18px",
      textTransform: "none",
      "&:hover": {
        border: "1px solid white",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "10px !important",
        width: "100%",
      },
    },
    searchInput: {
      backgroundColor: "var(--white)",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )} Work Sans`,
      height: "44px",
      width: "350px",
      margin: 0,
      paddingLeft: "45px",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        textOverflow: "ellipse",
        padding: theme.spacing(0.5, 2, 0.5, 1),
        paddingLeft: "40px",
      },
      "&:before": {
        border: 0,
      },
    },
    searchDiv: {
      position: "relative",
      textAlign: "center",
      width: "100%",
    },
    searchIcon: {
      position: "absolute",
      top: "10px",
      left: "12px",
      zIndex: 9,
    },
    img: {
      width: "100%",
      height: "auto",
    },
    modalOuterDiv: {
      margin: theme.spacing(0, "auto"),
      textAlign: "center",
      width: "85%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        textAlign: "start",
      },
    },
    modalInnerDiv: {
      display: "flex",
      placeContent: "space-between",
      margin: theme.spacing(5, 0),
    },
    modalTitle: {
      font: `normal ${theme.spacing(2.6)} Work Sans SemiBold`,
      lineHeight: "30px",
      color: "var(--black300)",
    },
    modalPara: {
      font: `normal ${theme.spacing(1.6)} Work Sans Medium`,
      lineHeight: "19px",
      color: "var(--black300)",
      margin: theme.spacing(1.2, 0),
    },
    radioButton: {
      transition: "none",
      "&:hover": { backgroundColor: "white" },
      width: "14px",
      height: "14px",
    },
    checkBoxDiv: {
      display: "flex",
      placeContent: "space-between",
    },

    externalDiv: {
      margin: theme.spacing(2, 5),
      [theme.breakpoints.down("xs")]: {
        margin: 0,
      },
    },
    optionContainer: {
      display: "flex",
    },
    optionTitle: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )} Work Sans`,
      lineHeight: "19px",
      color: "var(--secondary-black)",
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down("xs")]: {
        margin: 0,
      },
    },
    optionTask: {
      font: `normal  ${theme.spacing(1.4)} Work Sans`,
      fontWeight: "normal",
      lineHeight: "24px",
      letterSpacing: "-0.333333px",
      color: "rgba(51, 51, 51, 0.99)",
    },
    option: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(0, 1),
    },
    modalPara2: {
      font: `normal ${theme.spacing(1.3)} Work Sans Regular`,
      lineHeight: "22px",
      color: "var(--grey-color)",
      margin: theme.spacing(0, 1),
    },
    btn: {
      "& .MuiButton-fullWidth": {
        width: "60%",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
      },
    },
  })
);



function SendGift() {
  const classes = useStyles();



  const history = useNavigate();

  return (
    <>
      <div className={classes.mainContainer}>
        <Grid container>
         <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <div className={classes.cardContainer}>
                <img
                  src={Utils.images.REDEEM_GIFT}
                  className={classes.img}
                  alt="gift"
                />
              </div>
            </Grid>
          </Box>
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <div className={classes.descContainer}>
              <Typography variant="h3" className={classes.heading}>
                Create a Gift Box
              </Typography>
              <Typography variant="h3" className={classes.description}>
                Dreaming of a summer escape? Slip into the shower for a taste of
                the tropics with this fruity fresh shower gel. It’s enriched
                with mango extract from soft and squidgy mangoes and cleanses
                your skin with its silky sudsy layers.
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => {
                  history("/create-gift/gift-select-box");
                }}
              >
                Create a Gift Box
              </Button>
            </div>
          </Grid>
         <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <div className={classes.cardContainer}>
                <img
                  src={Utils.images.REDEEM_GIFT}
                  className={classes.img}
                  alt="gift"
                />
              </div>
            </Grid>
          </Box>
        </Grid>
      </div>
      <Grid container className={classes.searchContainer}>
        <Grid item xs={12} md={8} lg={8}>
          <div className={classes.descContainer}>
            <Typography variant="h3" className={classes.searchHeading}>
              Buy a Gift Card in Store
            </Typography>
            <Typography variant="h3" className={classes.buyDescription}>
              Visit us in store for a free consultation lorem ipsum dolor sit
              ametabore et magna aliqua quis nostrud exercitation, Visit us in
              store for a free consultation lorem ipsum dolor sit ametabore et
              magna aliqua quis.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <div className={classes.searchDiv}>
            {/* <img
              src={`${Utils.images.GIFT_SEARCH}`}
              className={classes.searchIcon}
              alt="search"
            />

            <Input
              className={classes.searchInput}
              placeholder="Search town or postcode"
            /> */}
            <CustomButton
              onClick={() => history("/stores")}
              fullWidth={false}
              text={"Find My Nearest Store"}
              type={"button"}
              variant="outlined"
              className={classes.searchButton}
            />
          </div>
        </Grid>
      </Grid>

      {/* <CustomModal
                open={choiceModal}
                handleClose={() => {
                  setChoiceModal(false);
                }}
              >
                <div className={classes.modalOuterDiv}>
                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="h3" className={classes.modalTitle}>
                    Select
                  </Typography>
                  <Typography variant="body2" className={classes.modalPara}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Typography>
                  </Box>
                

                  <div className={classes.externalDiv}>
                    <Grid container >
                      {options.map((item: any) => (
                        <Grid item xs={12} md={6} key={item.id}>
                          <div className={classes.optionContainer}>
                            <GreenRadio
                              className={classes.radioButton}
                              checked={selectedType === `${item.type}`}
                              onChange={() => setSelectedType(`${item.type}`)}
                              value="selectedType"
                              name="radio-button-demo"
                              inputProps={{ "aria-label": "C" }}
                            />
                            <div className={classes.option}>
                              <Typography className={classes.optionTitle}>
                                {item.title}
                              </Typography>
                             <Box sx={{ display: { xs: "block", sm: "none" } }}>
                              <Typography className={classes.optionTask}>
                                {item.subTitle}
                              </Typography>
                              </Box>
                             
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" className={classes.modalPara2}>
                    Lorem Ipsum is simply dummy text of the printing and type.
                  </Typography>
                  </Box>
                  
                  <div className={classes.btn}>
                    <CustomButton
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        selectedType === "free"
                          ? history.push("/create-gift/gift-select-box")
                          : history.push("/create-gift/select-product")
                      }
                      text={" Continue"}
                      type={"button"}
                    />
                  </div>
                </div>
              </CustomModal> */}
    </>
  );
}

export default SendGift;
