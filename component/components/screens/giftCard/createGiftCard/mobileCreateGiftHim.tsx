import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CustomButton from "../../../components/common/button";
import Utils from "../../../utils";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
    },
    heading: {
      font: `normal ${theme.spacing(2.8)}  Druk Bold`,
      color: "var(--light-green)",
      lineHeight: "33px",
      marginBottom: theme.spacing(0.5),
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
    outerContainer: {
      padding: theme.spacing(2, 0),
      // marginTop: "30px",
      textAlign: "center",
    },
    subHeading: {
      font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
        1.4
      )}  Roboto`,
      color: "var(--light-green)",
      lineHeight: "20.4px",
      margin: theme.spacing(1),
      padding: "0px 10px",
      textAlign: "center",
    },
    img: {
      width: "55%",
      height: theme.spacing(20),
      objectFit: "cover",
      position: "relative",
    },
    innerContainer: {
      background: "var(--light-green)",
      margin: theme.spacing(-4, 3),
      // position: "absolute",
      position: "relative",
      padding: theme.spacing(1.5),
      borderRadius: "5px",
    },
    title: {
      font: `normal ${theme.spacing(1.9)}  Work Sans Bold`,
      color: "var(--primary)",
      textTransform: "uppercase",
      marginBottom: theme.spacing(0.5),
    },
    subTitle: {
      font: `normal ${theme.spacing(1.4)}  Work Sans Regular`,
      color: "var(--primary)",
      textAlign: "initial",
      marginBottom: theme.spacing(0.5),
    },
    btn: {
      borderRadius: "4px",
      background: "var(--light-green) !important",
      color: "var(--primary) !important",
      margin: theme.spacing(4, 0, 0, 1),
      width: "95%",
      font: `normal ${theme.spacing(1.4)}  Work Sans Bold`,
      padding: theme.spacing(1.2),
      letterSpacing: "0.06em",
    },
    para:{
        font: `normal ${theme.spacing(1.4)}  Work Sans Regular`,
      color: "var(--white)",
      lineHeight: "22.4px",
      marginBottom: theme.spacing(0.5),
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
          width: "90%",
        },
      },
      searchDiv: {
        marginTop: theme.spacing(3.5),
        textAlign: "center",
      }
  })
);

const data = [
  {
    id: 1,
    title: "Create Gift for Him",
    description:
      "Summer is officially here and we couldn’t be happier about it. But what does that mean for our skin? We all know the importance of using SPF daily, but we have a secret unsung hero for the summer months. A face toner is essential to leave skin clean as a whistle and prep your skin for moisture and protection.",
    image: `${Utils.images.REFILL1}`,
  },
  {
    id: 2,
    title: "Create Gift for Her",
    description:
      "Summer is officially here and we couldn’t be happier about it. But what does that mean for our skin? We all know the importance of using SPF daily, but we have a secret unsung hero for the summer months. A face toner is essential to leave skin clean as a whistle and prep your skin for moisture and protection.",
    image: `${Utils.images.REFILL2}`,
  },
];

const MobileCreateGiftHim = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4" align="center" className={classes.heading}>
          Join the Club
        </Typography>
        <Typography variant="body1" align="center" className={classes.para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris
        </Typography>
        {data.map((item: any) => (
          <div>
            <div className={classes.outerContainer}>
              <img src={item.image} alt="productImg" className={classes.img} />
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.title}>
                  {item?.title || ""}
                </Typography>
                <Typography variant="h4" className={classes.subTitle}>
                  {item?.description
                    ? _.truncate(
                        Utils.CommonFunctions.replaceHtmlTag(item?.description),
                        { length: 180 }
                      )
                    : ""}
                </Typography>
              </div>
            </div>

          
          </div>
        ))}
        <div className={classes.searchDiv}>
        <CustomButton
              fullWidth
              text={"Discover More"}
              type={"button"}
              variant="outlined"
              className={classes.searchButton}
            />
        </div>
        
      </div>
    </>
  );
};

export default MobileCreateGiftHim;
