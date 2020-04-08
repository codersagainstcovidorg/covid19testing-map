import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  LinearProgress,
  Modal,
  Typography,
} from '@material-ui/core';
import ReactGA from 'react-ga';
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../App';
import DoctorStep from './DoctorStep';
import SearchStep from './SearchStep';

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

interface GuideModalProps {
  onClose: Function;
}

const GuideModal = ({ onClose }: GuideModalProps) => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(true);

  function shouldShowSearch(value: boolean) {
    if (value) {
      setCurrentStep(1);
      onClose();
    } else {
      setCurrentStep(2);
    }
  }

  function getStepContent(step: number) {
    console.log(step);
    switch (step) {
      case 0:
        return <DoctorStep onResponseClick={shouldShowSearch} />;
      case 1:
        return <SearchStep />;
      default:
        return 'Unknown step';
    }
  }

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
    <Modal
      className={classes.modal}
      onClose={() => {
        setModalOpen(false);
        setCurrentStep(2);
      }}
      open={modalOpen}
      disableBackdropClick={currentStep !== 1}
      BackdropProps={{
        invisible: currentStep === 1,
      }}
      disableEnforceFocus
    >
      <Card className={classes.card}>{getStepContent(currentStep)}</Card>
    </Modal>
  );
};

export default GuideModal;
