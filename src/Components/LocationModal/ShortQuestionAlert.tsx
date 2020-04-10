import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';

interface SelfAssessmentCompletedProps {
  showAlert: boolean;
  yesSelected: Function;
  noSelected: Function;
  questionText: String;
}

const ShortQuestionAlert = ({
  showAlert,
  yesSelected,
  noSelected,
  questionText,
}: SelfAssessmentCompletedProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  const handleYes = () => {
    yesSelected();
    setOpen(false);
  };
  const handleNo = () => {
    noSelected();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{questionText}</DialogTitle>
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
