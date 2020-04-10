import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  DialogContentText,
  Divider,
  IconButton,
  Modal,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactGA from 'react-ga';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../../App';
import LocationDetails from './LocationDetails';
import LocationActions from './LocationActions';
import InfoAlert from './InfoAlert';
import ShortQuestionAlert from './ShortQuestionAlert';

const useStyles = makeStyles((theme: Theme) =>
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
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    detailText: {
      marginLeft: 'auto',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    callToAction: {
      borderRadius: '20px',
      width: '100%',
      height: '60px',
      fontSize: '20px',
    },
    grid: {
      flexGrow: 1,
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
    cardHeader: {
      paddingBottom: '0px',
    },
  })
);

interface LocationModalProps {
  location: any;
  onClose: Function;
  toggleFilter: Function;
}

const LocationModal = ({
  location,
  onClose,
  toggleFilter,
}: LocationModalProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showNavigateAwayAlert, setShowNavigateAwayAlert] = React.useState(
    false
  );
  const [
    showSelfAssessmentCompletedAlert,
    setShowSelfAssessmentCompletedAlert,
  ] = React.useState(false);
  const [showNeedHelp, setShowNeedHelp] = React.useState(false);
  const [showMapUpdatedAlert, setShowMapUpdatedAlert] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setShowSelfAssessmentCompletedAlert(false);
  }, []);

  const classes = useStyles();

  function handleLinkClicked(locationId: string, action: string): void {
    ReactGA.event({
      category: 'Location',
      action,
      label: locationId,
    });
  }

  function handleCheckSymptomsClicked() {
    setShowNavigateAwayAlert(true);
  }

  function navigateAwayAgreed() {
    setShowNavigateAwayAlert(false);
    window.open(
      location.location_contact_url_covid_screening_tool === '' ||
        location.location_contact_url_covid_screening_tool === null ||
        location.location_contact_url_covid_screening_tool.length < 4
        ? 'https://www.apple.com/covid19/'
        : location.location_contact_url_covid_screening_tool,
      '_blank'
    );
    setShowSelfAssessmentCompletedAlert(true);
  }

  function mapUpdateAgreed() {
    setShowMapUpdatedAlert(false);
  }

  function completedAssessment() {
    setShowSelfAssessmentCompletedAlert(false);
    setShowNeedHelp(true);
  }

  function didNotCompleteAssessment() {
    setShowSelfAssessmentCompletedAlert(false);
  }

  function needHelp() {
    toggleFilter('is_collecting_samples');
    setShowNeedHelp(false);
    setShowMapUpdatedAlert(true);
  }

  function doesNotNeedHelp() {
    setShowNeedHelp(false);
  }

  const details: any = [];

  Object.keys(labelMap).forEach((key: string) => {
    details.push({
      type: 'boolean',
      title: labelMap[key].card,
      key,
      icon: labelMap[key].icon,
    });
  });

  const address = `${location.location_address_street}, ${location.location_address_locality}, ${location.location_address_region} ${location.location_address_postal_code}`;

  return (
    <Modal
      className={classes.modal}
      onClose={() => onClose()}
      disableAutoFocus
      open
    >
      <Card className={classes.card}>
        <CardHeader
          title={location.location_name}
          subheader={address}
          className={classes.cardHeader}
          action={
            <LocationActions
              onLinkClick={handleLinkClicked}
              location={location}
            />
          }
        />

        <CardContent>
          <Typography color="textPrimary" className={classes.cardMargin}>
            {location.additional_information_for_patients}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.callToAction}
            onClick={() => {
              handleCheckSymptomsClicked();
              handleLinkClicked(location.location_id, 'Website Click');
            }}
          >
            Check your Symptoms
          </Button>
        </CardContent>
        <Divider />
        <CardActions
          onClick={handleExpandClick}
          disableSpacing
          className={classes.cardActions}
        >
          <Typography className={classes.detailsButton}>Details</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <LocationDetails
          location={location}
          expanded={expanded}
          details={details}
        />
        <InfoAlert
          showAlert={showNavigateAwayAlert}
          okClicked={navigateAwayAgreed}
          title="Navigating to the Symptom Checker"
          body="I’m about to open another window that will load the symptom checker used by this testing location. Once you complete the assessment, come back here to continue. Click OK to continue."
        />
        <ShortQuestionAlert
          showAlert={showSelfAssessmentCompletedAlert}
          yesSelected={completedAssessment}
          noSelected={didNotCompleteAssessment}
          questionText="Were you able to complete the self-assessment?"
        />
        <ShortQuestionAlert
          showAlert={showNeedHelp}
          yesSelected={needHelp}
          noSelected={doesNotNeedHelp}
          questionText="Based on the results of the self-assessment: do you need help finding a testing location near you?"
        />
        <InfoAlert
          showAlert={showMapUpdatedAlert}
          okClicked={mapUpdateAgreed}
          title="Map Updated"
          body="I’ve updated the map, the remaining pins represent locations that are capable of perform the actual test. Carefully review the instructions for each location and select the one that seems to be a good fit. I will highlight any locations with additional requirements or special features, such as appointments or telemedicine visits."
        />
      </Card>
    </Modal>
  );
};

export default LocationModal;
