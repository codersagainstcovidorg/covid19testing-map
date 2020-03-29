import React from 'react';
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
import DataUpdateSnackbar from './DataUpdateSnackbar';

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

interface iProps {}
interface iState {
  open: boolean;
  hideLegal: boolean;
}

class LegalModal extends React.Component<iProps, iState> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: localStorage.getItem('hideLegal') !== 'true',
      hideLegal: localStorage.getItem('hideLegal') === 'true',
    };
  }

  handleClose = () => {
    const { hideLegal } = this.state;
    localStorage.setItem('hideLegal', String(hideLegal));
    this.setState({ open: false });
  };

  handleChange = (event: any) => {
    const input = event.target;
    const value = input.checked;
    this.setState({ hideLegal: value });
  };

  render() {
    const { open, hideLegal } = this.state;
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Before you get started
          </DialogTitle>
          <DialogContent dividers>
            <Typography
              style={{
                padding: '12%',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                color: '#E45B26',
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
              By using this service, you agree to release from liability and
              waive any right to file legal motions against Coders Against
              COVID, their officers, volunteers and agents from any and all
              claims, including but not limited to claims of negligence,
              resulting in physical injury, illness (including death) or
              economic loss which may result from using this service, or any
              events incidental to the use of this service.
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
                  onChange={this.handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Don't show me this again"
            />
            <div style={{ flex: '1 0 0' }} />
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {!open && <DataUpdateSnackbar />}
      </div>
    );
  }
}

export default LegalModal;
