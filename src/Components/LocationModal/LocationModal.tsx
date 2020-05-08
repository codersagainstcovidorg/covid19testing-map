import React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  Divider,
  IconButton,
  Modal,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Icon } from '@mdi/react';
import { 
  mdiCalendarPlus
  ,mdiCarInfo
  ,mdiClockFast
  ,mdiDiabetes
  ,mdiDna
  ,mdiDoctor
  ,mdiFlagTriangle
  ,mdiMinusCircle
  ,mdiPhoneForward
  ,mdiTestTube
  ,mdiShare
  ,mdiHazardLights
} from '@mdi/js';
import ReactGA from 'react-ga';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { labelMap } from '../../App';
import LocationDetails from './LocationDetails';
import LocationActions from './LocationActions';
import { trackUiClick } from '../../utils/tracking';
import ActionType from '../Types/ActionType';
import {convert} from '../../utils/fetchLastUpdated';
import theme from '../../theme';

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
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    cardContent: {
      display: 'flexGrow',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      listStyle: 'none',
      padding: theme.spacing(1.5),
      margin: 10,
    },
    chipRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'top',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

interface LocationModalProps {
  location: any;
  onClose: Function;
  showCheckSymptomsFlow: Function;
  runAppointmentFlow: Function;
  filterApplied: boolean;
};

interface ChipData {
  key: number;
  label: string;
  ariaLabel: string;
  isTrue: boolean;
  visibility: string;
  tooltip: string;
  icon: any;
  rotate: number;
};


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
  
  const raw_attributes = JSON.parse(location.raw_data);
  
  // eslint-disable-next-line
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, 
      label: ((location.is_collecting_samples_by_appointment_only === true) ? "Appointment is required" : "Appointment NOT required"), 
      ariaLabel: 'appointment',
      isTrue: (location.is_collecting_samples_by_appointment_only === true), 
      visibility: ((location.is_collecting_samples_by_appointment_only) ? "visible" : "visible"), 
      tooltip: ((location.is_collecting_samples_by_appointment_only)? "An appointment is required for testing at this location" : "No appointment required (drop-in/walk-in)"), 
      icon: ((location.is_collecting_samples_by_appointment_only === true) ? mdiCalendarPlus : mdiMinusCircle),
      rotate: 0
    },
    { key: 1, 
      label: (location.is_ordering_tests_only_for_those_who_meeting_criteria === true) ? "Requires pre-evaluation" : "Pre-evaluation NOT required",
      ariaLabel: 'referral',
      isTrue: (location.is_ordering_tests_only_for_those_who_meeting_criteria === true), 
      visibility: ((location.is_ordering_tests_only_for_those_who_meeting_criteria) ? "visible" : "visible"), 
      tooltip: ((location.is_ordering_tests_only_for_those_who_meeting_criteria === true) ? "Testing is only performed for persons with symptoms and meet testing criteria (MD referral may be required)" : "Testing anyone who meets criteria (MD referral NOT required)"), 
      icon: ((location.is_ordering_tests_only_for_those_who_meeting_criteria === true) ? mdiShare : mdiMinusCircle),
      rotate: 0
    }
    ,{ key: 2, 
      label: (location.is_call_ahead === true) ? "Call ahead" : "No need to call ahead",
      ariaLabel: 'call ahead',
      isTrue: (location.is_call_ahead === true), 
      visibility: ((location.is_call_ahead) ? "visible" : "visible"), 
      tooltip: ((location.is_call_ahead === true) ? "Call prior to heading to the location" : "No need to call ahead (appointment may still be necessary)"), 
      icon: ((location.is_call_ahead === true) ? mdiPhoneForward : mdiMinusCircle),
      rotate: 0
    }
    ,{ key: 3, 
      label: (location.is_evaluating_symptoms === true) ? "Screening symptoms" : "NOT Screening symptoms",
      ariaLabel: 'screening',
      isTrue: (location.is_evaluating_symptoms === true), 
      visibility: ((location.is_evaluating_symptoms) ? "visible" : "visible"), 
      tooltip: ((location.is_evaluating_symptoms === true) ? "This location offers screening for symptoms of COVID-19" : "This location does NOT offer screening for symptoms of COVID-19"), 
      icon: ((location.is_evaluating_symptoms === true) ? mdiDoctor : mdiMinusCircle),
      rotate: 0
    }
    ,{ key: 4, 
      label: (location.is_collecting_samples === true) ? "Collecting samples" : "NOT Collecting samples",
      ariaLabel: 'testing',
      isTrue: (location.is_collecting_samples === true), 
      visibility: ((location.is_collecting_samples) ? "visible" : "visible"), 
      tooltip: ((location.is_collecting_samples === true) ? "This location collects samples to be tested for COVID-19" : "This location does NOT collect samples to be tested for COVID-19"), 
      icon: ((location.is_collecting_samples === true) ? mdiTestTube : mdiMinusCircle),
      rotate: ((location.is_collecting_samples === true) ? 45 : 0),
    }
    ,{ key: 5, 
      label: (raw_attributes.is_same_day_result === true) ? "Rapid test results" : "No rapid test",
      ariaLabel: 'rapid-test',
      isTrue: (raw_attributes.is_same_day_result === true), 
      visibility: ((raw_attributes.is_same_day_result) ? "visible" : "visible"), 
      tooltip: ((raw_attributes.is_same_day_result === true) ? "This location offers point-of-care testing, which yields results in a few hours or less" : "This location does NOT offer point-of-care testing, which means that it may take one or more days to receive your results"), 
      icon: ((raw_attributes.is_same_day_result === true) ? mdiClockFast : mdiMinusCircle),
      rotate: 0
    }
    ,{ key: 6, 
      label: (raw_attributes.does_offer_molecular_test === true) ? "Molecular-based" : "Molecular-based",
      ariaLabel: 'molecular-test',
      isTrue: (raw_attributes.does_offer_molecular_test === true), 
      visibility: ((raw_attributes.does_offer_molecular_test) ? "visible" : "visible"), 
      tooltip: ((raw_attributes.does_offer_molecular_test === true) ? "This location offers molecular-based tests for COVID-19" : "This location does NOT offer molecular-based tests for COVID-19"), 
      icon: ((raw_attributes.does_offer_molecular_test === true) ? mdiDna : mdiMinusCircle),
      rotate: ((location.does_offer_molecular_test === true) ? 45 : 0),
    }    
    ,{ key: 7, 
      label: (raw_attributes.does_offer_antibody_test === true) ? "Antibody-based" : "Antibody-based",
      ariaLabel: 'antibody-test',
      isTrue: (raw_attributes.does_offer_antibody_test === true), 
      visibility: ((raw_attributes.does_offer_antibody_test) ? "visible" : "visible"), 
      tooltip: ((raw_attributes.does_offer_antibody_test === true) ? "This location offers antibody-based tests for COVID-19" : "This location does NOT offer antibody-based tests for COVID-19"), 
      icon: ((raw_attributes.does_offer_antibody_test === true) ? mdiDiabetes : mdiMinusCircle),
      rotate: 0,
    }
    ,{ key: 7, 
      label: (raw_attributes.is_drive_through === true) ? "Drive-through" : "NOT Drive-through",
      ariaLabel: 'drive-through',
      isTrue: (raw_attributes.is_drive_through === true), 
      visibility: ((raw_attributes.is_drive_through) ? "visible" : "hidden"), 
      tooltip: ((raw_attributes.is_drive_through === true) ? "This location is a drive-through" : "This location is NOT a drive-through"), 
      icon: ((raw_attributes.is_drive_through === true) ? mdiCarInfo : mdiMinusCircle),
      rotate: 0,
    }
    ,{ key: 8, 
      label: (raw_attributes.is_temporary === true) ? "1-day only" : "NOT 1-day only",
      ariaLabel: 'one-day-only',
      isTrue: (raw_attributes.is_temporary === true), 
      visibility: ((raw_attributes.is_temporary) ? "visible" : "hidden"), 
      tooltip: ((raw_attributes.is_temporary === true) ? "This location is only offering services one day please read the information carefully." : ""), 
      icon: ((raw_attributes.is_temporary === true) ? mdiHazardLights : mdiMinusCircle),
      rotate: 0,
    }
    ,{ key: 9, 
      label: (raw_attributes.is_flagged === true) ? "Flagged" : "Not flagged",
      ariaLabel: 'flagged',
      isTrue: (raw_attributes.is_flagged === true), 
      visibility: ((raw_attributes.is_flagged) ? "visible" : "hidden"), 
      tooltip: ((raw_attributes.is_flagged === true) ? "This location has been flagged as suspicious and possibly fraudulent, proceed with caution." : ""), 
      icon: ((raw_attributes.is_flagged === true) ? mdiFlagTriangle : mdiMinusCircle),
      rotate: 0,
    }
  ]);

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

  const address = `${((typeof location.location_address_street === 'string') && !(location.location_address_street.trim().empty)) ? (location.location_address_street.trim()) : ''}`;

  return (
    <Modal
      className={classes.modal}
      onClose={() => onClose()}
      disableAutoFocus
      open
    >
      <Card className={classes.card}>
        <Typography variant="overline" style={{ paddingLeft: '15px',paddingTop: '25px', paddingBottom: '0px', color: 'orange', fontWeight: 'bolder' }}>
          {(location.is_collecting_samples_by_appointment_only === true) ? 'Appointment only ' : 
            ''
          }
        </Typography>
        {/* <Grid item md={3} xs={12}>
            <div
              style={{
                paddingTop: '20px',
              }}
            >
              <span className="fa-layers fa-fw fa-4x" style={{ width: '100%' }}>
                <FontAwesomeIcon icon={faCircle} color={indigo[800]} />
                <FontAwesomeIcon
                  icon={renderLocationIcon(
                    location.location_place_of_service_type
                  )}
                  transform="shrink-6"
                  color="white"
                />
              </span>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Chip
                  size="medium"
                  label={getLocationName(
                    location.location_place_of_service_typeZ
                  )}
                  className={classes.typeChip}
                />
              </div>
            </div>
          </Grid> */}
        <CardHeader
          // title={location.location_name}
          title={
            <ReactGA.OutboundLink
                eventLabel={'CardHeader | Location | ' + location.location_address_locality + ' | ' + location.location_name }
                to={location.location_contact_url_main}
                target="_blank"
                style={{ textDecoration: 'none', color: '#12005e' }}
              >
                {location.location_name}
            </ReactGA.OutboundLink>
          }
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
          <Typography variant="h6" style={{ paddingBottom: '0px', color: '#12005e', textTransform: 'uppercase' }}>
            {location.location_status}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography color="textPrimary" variant="overline" style={{ marginBottom: '0px', fontWeight: 'bolder' }}>
            {(location.is_evaluating_symptoms === true) && (location.is_collecting_samples === true) ? 'COVID-19 screening and testing in ' + (location.location_address_locality ?? location.location_address_region ?? 'this area') : 
              (location.is_evaluating_symptoms === true) && (location.is_collecting_samples === false) ? 'COVID-19 screening in ' + (location.location_address_locality ?? location.location_address_region ?? 'this area') : 
                (location.is_evaluating_symptoms === false) && (location.is_collecting_samples === true) ? 'COVID-19 screening in ' + (location.location_address_locality ?? location.location_address_region ?? 'this area') : 
                  'COVID-19 location in ' + (location.location_address_locality ?? location.location_address_region ?? 'this area')
            }
          </Typography>
          {/* <Typography color="textPrimary" paragraph variant="body1"></Typography> */}
          
          <div className={classes.cardContent} style={{ paddingTop: '0px', marginTop: '0px' }}>
            <Paper elevation={0} component="ul" className={classes.chipRoot} >
              {chipData.map((data) => {
                // let icon;

                // if (data.label === 'React') {
                //   icon = <TagFacesIcon />;
                // }

                return (
                  <Box key={data.key} component="li" visibility={data.visibility}>
                    <Tooltip 
                      title={data.tooltip}
                      aria-label={data.ariaLabel}>
                      <Chip 
                        // icon={data.icon}
                        icon={<Icon path={data.icon}
                          title="data.label" 
                          size={1}
                          rotate={data.rotate}
                          color={(data.isTrue) ? "white" : theme.palette.warning.main }
                          />
                        }
                        label={data.label}
                        size= "medium"
                        variant={(data.isTrue) ? "default" : "outlined"}
                        color="primary" 
                        className={classes.chip}
                      />
                    </Tooltip>
                  </Box>
                );
              })}
            </Paper>
          </div>
          
          <Typography color="textPrimary" variant="body2" style={{ paddingBottom: '20px' }}>
            {'For the most current and authoritative information about COVID-19 testing in your area, visit your '}
            <ReactGA.OutboundLink
              eventLabel={'OutboundLink | DPH | ' + location.location_address_locality + ' | ' + (location.location_address_locality ?? location.location_address_region ?? location.location_address_street) }
              to={location.reference_publisher_of_criteria}
              target="_blank"
            >
              health department website
            </ReactGA.OutboundLink>
            {'.'}
          </Typography>
          
          <Typography color="textPrimary" variant="caption" style={{ marginBottom: '10px' }}>
            {'\nLast update: ' + convert(location.updated_on) + '\n\n'}
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
              style={{ marginTop: '20px', marginBottom: '5px' }}
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
