import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    routeName: {
      display: "flex",
      flexBasis: "100%",
      // alignItems: "baseline",
      // padding: theme.spacing(2, 0, 0, 0),

      width: "100%",
      "& > *": {
        font: `normal ${theme.spacing(1.4)}px Work Sans`,
        fontWeight: 600,
        lineHeight: "16px",
        // color: "var(--light-gray)",
        // margin: theme.spacing(0, 0.4),
        marginLeft: "4px",
        display: "flex",
        alignItems: "baseline",
      },
      "&> a+a:before": {
        content: "'/'",
        // marginRight: "6px",
        marginLeft: "0px",
      },
      "& a:last-child": {
        fontWeight: 500,
        // color: "var(--black)"
      },
    },
    skeleton: {
      marginBottom: "10px",
    },
    bread: {
      cursor: "pointer",
      // color: "var(--primary)",
      font: "normal 14px Work Sans SemiBold",
    },
    breadCurrent: {
      cursor: "pointer",
      font: "normal 14px Work Sans",
    },
  })
);
interface Props {
  breadcrumb: Array<{
    title: any;
    action: any;
  }>;
  type?: "default" | "white";
  state?: any;
}

const BreadCrumb = ({ breadcrumb, type = "default", state }: Props) => {
  const classes = useStyles();
  const history = useRouter();
  const skeletonLoader = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader;
  });
  return (
    <>
      {/* to be changed
        <Hidden xsDown> */}
      <Typography component="span" className={classes.routeName}>
        {skeletonLoader
          ? breadcrumb.map((_val: any, i: any) => {
              if (i === 0)
                return (
                  <Skeleton
                    className={classes.skeleton}
                    variant="rectangular"
                    width={60}
                    key={i}
                  />
                );
              else
                return (
                  <>
                    <div key={i}>
                      /{" "}
                      <Skeleton
                        className={classes.skeleton}
                        variant="rectangular"
                        width={60}
                      />
                    </div>
                  </>
                );
            })
          : breadcrumb.map((val: any, i: any) => (
              <div key={i+ Math.random()}>
                <div
                  className={
                    i === breadcrumb.length - 1
                      ? classes.breadCurrent
                      : classes.bread
                  }
                  onClick={() => {
                    if (state) history.push("val.action", { query: state });
                    else history.push(val.action);
                  }}
                  key={i}
                  style={{
                    color: type === "white" ? "var(--white)" : "var(--primary)",
                  }}
                >
                  {i !== 0 ? "/ " : ""}
                  {`${val.title}`}
                </div>
              </div>
            ))}
      </Typography>
      {/* </Hidden> */}
    </>
  );
};

export default BreadCrumb;
