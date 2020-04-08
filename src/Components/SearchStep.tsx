import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import ReactGA from 'react-ga';
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../App';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      maxWidth: '90%',
      width: '600px',
      maxHeight: '90%',
      overflowY: 'auto',
    },
    responseButton: {
      textTransform: 'none',
      width: '50%',
      marginBottom: '10px',
    },
    cardMargin: {
      marginBottom: '16px',
    },
    detailsButton: {
      paddingLeft: '8px',
    },
    cardActions: {
      cursor: 'pointer',
    },
  })
);

const SearchStep = () => {
  const classes = useStyles();

  const handleLinkClicked = (locationId: string, action: string): void => {
    ReactGA.event({
      category: 'Location',
      action,
      label: locationId,
    });
  };

  const details: any = [];
  Object.keys(labelMap).forEach((key: string) => {
    details.push({
      type: 'boolean',
      title: labelMap[key].card,
      key,
      icon: labelMap[key].icon,
    });
  });
  return (
    <div>
      <CardHeader title="Search" />

      <CardContent>
        <Typography color="textPrimary" className={classes.cardMargin}>
          Great! Click the search bar in the bottom left to continue.
        </Typography>

        <CardActions />
      </CardContent>
    </div>
  );
};

export default SearchStep;
