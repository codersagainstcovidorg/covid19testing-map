import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { trackUiClick } from '../../utils/tracking';

interface SelfAssessmentCompletedProps {
  showAlert: boolean;
  yesSelected: Function;
  noSelected: Function;
}

const ShortQuestionAlert = ({
  showAlert,
  yesSelected,
  noSelected,
  children,
}: React.PropsWithChildren<SelfAssessmentCompletedProps>) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  const handleYes = () => {
    yesSelected();
    setOpen(false);
    trackUiClick(children!.toString(), 'Yes');
  };
  const handleNo = () => {
    noSelected();
    setOpen(false);
    trackUiClick(children!.toString(), 'No');
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{children}</DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShortQuestionAlert;
