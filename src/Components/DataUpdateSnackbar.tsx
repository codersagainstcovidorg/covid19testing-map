import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';

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
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
          Data updated: 03/29/2020 6:52AM EDT
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default DataUpdateSnackbar;
