import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import fetchLastUpdated from '../utils/fetchLastUpdated';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    // close: {
    //   padding: theme.spacing(0.5),
    // },
  })
);

const DataUpdateSnackbar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = React.useState<string>('');

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    fetchLastUpdated().then((time) => {
      setLastUpdated(time);
      setOpen(true);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableWindowBlurListener={false}
      >
        <MuiAlert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          icon={<InfoIcon />}
        > 
          GA residents - we're adding more locations check back often |
          Last update:
          {` ${lastUpdated}`}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default DataUpdateSnackbar;
