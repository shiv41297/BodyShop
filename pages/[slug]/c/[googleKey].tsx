import React from 'react';
import { makeStyles, Typography, Grid, Badge } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(3, 4),
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    minWidth: '1000px',
    maxWidth: '1440px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(2, 1),
      maxWidth: 'none',
      minWidth: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '100px',
      maxWidth: 'none',
      minWidth: 'auto',
      margin: theme.spacing(2, 1),
      padding: theme.spacing(2, 1),
    },
  },
  breadcrum: {
    display: 'flex',
    flexBasis: '100%',
    width: '100%',
    '& .MuiTypography-body1': {
      color: 'gray',
      font: `normal ${theme.typography.fontWeightLight} Work Sans`,
      padding: theme.spacing(0, 2),
    },
  },
  container: {
    flexBasis: '50%',
    position: 'sticky',
    top: '220px',
  },
  productDetails: {
    flexBasis: '50%',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      // maxHeight: '600px',
      overflowY: 'auto',
      '& ::-webkit-scrollbar-thumb': {
        background: 'rgba(90, 90, 90)',
      },
      '&::-webkit-scrollbar': {
        width: '0px',
        height: '0px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0.2),
      flexBasis: '100%',
    },
  },

  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      1.8
    )}px Work Sans`,
    lineHeight: '18px',
    letterSpacing: '0.02em',
    color: 'var(--black)',
  },

  list: {
    padding: theme.spacing(1, 0, 0, 3),
  },

  filterFooter: {
    marginTop: theme.spacing(5),
    width: '100%',
    marginBlockStart: '370px',
    [theme.breakpoints.down('xs')]: {
      marginBlockStart: '0px',
    },
  },
  carouselHeading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.4
    )}px  Recoleta Alt`,
    color: '#084236',
    lineHeight: 1.5,
    margin: theme.spacing(0, 0, 0.5, 2),
    maxWidth: '500px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.6
      )}px  Recoleta Alt Bold`,
      margin: theme.spacing(0, 0, 0.5, 0),
      color: 'var(--black)',
    },
  },
  // accordionHeading: {
  //   fontWeight: "bold",
  // },
  content: {
    paddingLeft: '0px',
    [theme.breakpoints.down('xs')]: {
      '& strong': {
        color: 'var(--black)',
      },
    },
  },

  skeletonView: {
    margin: theme.spacing(2),
  },
  description: {
    marginTop: '10px',
    font: `normal 400 ${theme.spacing(1.5)}px Work Sans`,
    lineHeight: '27px',
  },
  title: {
    marginTop: '10px',
    font: `normal 700 ${theme.spacing(1.4)}px  Recoleta Alt`,
    color: 'black',
  },

  btnDiv: {
    [theme.breakpoints.down('xs')]: {
      zIndex: 1200,
      position: 'fixed',
      top: '19px',
      right: '20px',
    },
  },
  fixedIcon: {
    display: 'flex',
    placeItems: 'center',
    position: 'sticky',
    top: '19px',
  },
  searchIcon: {
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
    marginLeft: theme.spacing(2.5),
  },
  badge: {
    color: theme.palette.primary.main,
  },
  sideBarLogo: {
    display: 'flex',
    padding: theme.spacing(1),
    backgroundColor: 'var(--primary)',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(1),

      '& .MuiTypography-body2': {
        font: `normal 700  18px Druk`,
        color: theme.palette.secondary.main,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      '& .MuiTypography-body1': {
        font: `normal 400  12px Work Sans`,
        color: 'var(--white)',
      },
    },
  },
  logo: {
    height: '40px',
    width: '40px',
  },
}));

function ProductListing() {
  return <div>[googleKey]</div>;
}

export default ProductListing;
