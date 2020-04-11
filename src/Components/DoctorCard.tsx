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
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../App';
import { trackUiClick } from '../utils/tracking';

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

interface DoctorStepProps {
  onResponseClick: Function;
}

const DoctorCard = ({ onResponseClick }: DoctorStepProps) => {
  const classes = useStyles();
  const details: any = [];
  Object.keys(labelMap).forEach((key: string) => {
    details.push({
      type: 'boolean',
      title: labelMap[key].card,
      key,
      icon: labelMap[key].icon,
    });
  });

  const handleResponseClick = (value: boolean) => {
    trackUiClick('DoctorCard', value ? 'yes' : 'no');
    onResponseClick(value);
  };

  return (
    <div>
      <CardHeader
        title="Welcome to Find Covid Testing"
        subheader="First things first: it sounds like you need to be screened for symptoms of COVID-19"
      />

      <CardContent>
        <Typography color="textPrimary" className={classes.cardMargin}>
          If you have a regular doctor, I can find out if they are offering
          COVID-19 screenings for their patients. Do you have a regular doctor?
        </Typography>

        <CardActions>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.responseButton}
              onClick={() => {
                handleResponseClick(true);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              className={classes.responseButton}
              onClick={() => {
                handleResponseClick(false);
              }}
            >
              No
            </Button>
          </Grid>
        </CardActions>
      </CardContent>
    </div>
  );
};

export default DoctorCard;
