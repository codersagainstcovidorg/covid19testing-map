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
  modalClose: Function;
  title: string;
}

const InfoAlert = ({
  showAlert,
  okClicked,
  title,
  modalClose,
  children,
}: React.PropsWithChildren<NavigateAwayProps>) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  const handleOk = () => {
    okClicked();
    setOpen(false);
    trackUiClick(title, 'Ok');
  };
  const handleClose = () => {
    modalClose();
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
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoAlert;
