import React, { useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { trackUiClick } from '../utils/tracking';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const LegalModal = () => {
  const [open, setOpen] = useState(
    localStorage.getItem('hideLegal') !== 'true'
  );
  const [hideLegal, setHideLegal] = useState(
    localStorage.getItem('hideLegal') === 'true'
  );

  function handleClose() {
    localStorage.setItem('hideLegal', String(hideLegal));
    setHideLegal(false);
    setOpen(false);
    trackUiClick('Legal Modal', 'Close'); // This could be more specific about which click triggered event
  }

  function handleChange(event: any) {
    const input = event.target;
    const value = input.checked;
    setHideLegal(value);
  }

  return (
    <div>
      <Dialog
        style={{ zIndex: 2500 }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Before you get started
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            style={{
              padding: '5%',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              color: '#E43E2F',
              textAlign: 'center',
            }}
          >
            If this is a medical emergency, stop and dial 911.
          </Typography>

          {/* <Divider style={{ margin: '35%' }} /> */}

          <Typography
            style={{
              fontWeight: 'normal',
              fontSize: '0.8rem',
              textAlign: 'center',
            }}
          >
            For informational purposes only. Consult your local medical
            authority for advice.
          </Typography>

          <Divider style={{ margin: '5%' }} />

          <Typography
            gutterBottom
            style={{
              textAlign: 'left',
            }}
          >
            By using this service, you agree to release from liability and waive
            any right to file legal motions against Coders Against COVID, their
            officers, volunteers and agents from any and all claims, including
            but not limited to claims of negligence, resulting in physical
            injury, illness (including death) or economic loss which may result
            from using this service, or any events incidental to the use of this
            service.
          </Typography>

          {/* <Typography gutterBottom>
            Sources: Publicly-accessible websites published by operators of testing locations, 
            public health agencies, major news outlets, and/or crowdsourcing. Crowdsourced 
            entries are verified using publicly-available data sources and/or by calling the 
            owner/operator of the testing location. 
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={
              <Checkbox
                checked={hideLegal}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Don't show me this again"
          />
          <div style={{ flex: '1 0 0' }} />
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LegalModal;
