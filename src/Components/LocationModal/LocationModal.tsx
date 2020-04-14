import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
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
import { trackUiClick } from '../../utils/tracking';
import ActionType from '../ActionType';

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
  showCheckSymptomsFlow: Function;
  runAppointmentFlow: Function;
  filterApplied: boolean;
}

const LocationModal = ({
  location,
  onClose,
  showCheckSymptomsFlow,
  filterApplied,
  runAppointmentFlow,
}: LocationModalProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    trackUiClick('Location Details', expanded ? 'collapse' : 'expand');
    setExpanded(!expanded);
  };

  const classes = useStyles();

  function handleLinkClicked(locationId: string, action: string): void {
    ReactGA.event({
      category: 'Location',
      action,
      label: locationId,
    });
  }

  function handleCheckSymptomsClicked() {
    showCheckSymptomsFlow(true);
  }
  function loadNextStepButton(locationToRender: any): any {
    let ctaText = '';
    let ctaLink = '';
    let actionType: ActionType;

    if (
      locationToRender.location_contact_url_covid_virtual_visit !== null &&
      locationToRender.location_contact_url_covid_virtual_visit.substring(
        0,
        4
      ) === 'http'
    ) {
      ctaText = 'Start Virtual Visit';
      ctaLink = locationToRender.location_contact_url_covid_virtual_visit;
      actionType = ActionType.Visit;
    } else if (
      locationToRender.is_collecting_samples_by_appointment_only === true &&
      locationToRender.location_contact_url_covid_appointments !== null &&
      locationToRender.location_contact_url_covid_appointments.substring(
        0,
        4
      ) === 'http'
    ) {
      ctaText = 'Book Appointment';
      ctaLink = locationToRender.location_contact_url_covid_appointments;
      actionType = ActionType.WebAppointment;
    } else if (
      locationToRender.is_collecting_samples_by_appointment_only === true &&
      locationToRender.location_contact_phone_covid !== null
    ) {
      ctaText = 'Call for Appointment';
      ctaLink = `tel://${locationToRender.location_contact_phone_covid}`;
      actionType = ActionType.CallAppointment;
    } else if (
      locationToRender.is_collecting_samples_by_appointment_only === true &&
      locationToRender.location_contact_phone_appointment !== null
    ) {
      ctaText = 'Call for Appointment';
      ctaLink = `tel://${locationToRender.location_contact_phone_appointment}`;
      actionType = ActionType.CallAppointment;
    } else {
      ctaText = 'Call Ahead';
      ctaLink = `tel://${locationToRender.location_contact_phone_main}`;
      actionType = ActionType.CallAhead;
    }

    return (
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.callToAction}
        onClick={() => {
          handleLinkClicked(locationToRender.location_id, 'Website Click');
          runAppointmentFlow(actionType, ctaLink);
        }}
      >
        {ctaText}
      </Button>
    );
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
          {filterApplied ? (
            loadNextStepButton(location)
          ) : (
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
          )}
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
      </Card>
    </Modal>
  );
};

export default LocationModal;
