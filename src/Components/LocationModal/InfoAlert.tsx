import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { trackUiClick } from '../../utils/tracking';

interface NavigateAwayProps {
  showAlert: boolean;
  okClicked: Function;
  title: string;
  body: string;
}

const InfoAlert = ({
  showAlert,
  okClicked,
  title,
  body,
}: NavigateAwayProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  const handleClose = () => {
    okClicked();
    setOpen(false);
    trackUiClick(title, 'Ok');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoAlert;
