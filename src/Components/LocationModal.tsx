import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  createStyles,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsIcon from '@material-ui/icons/Directions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReactGA from 'react-ga';
import { indigo, orange, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {
  faCampground,
  faCircle,
  faClinicMedical,
  faFirstAid,
  faHospital,
  faMedkit,
  faShieldAlt,
  faStethoscope,
  faUserMd,
  faVial,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { labelMap } from '../App';

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
    typeChip: {
      backgroundColor: orange[900],
      color: theme.palette.getContrastText(indigo[800]),
      height: '20px',
      marginTop: '5px',
    },
  })
);

interface ModalProps {
  location: any;
  onClose: Function;
}

interface LocationIconProps {
  locationType: any;
}

const LocationModal = ({ location, onClose }: ModalProps) => {
  // const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  function renderLocationIcon(param: any): IconProp {
    switch (param) {
      case 'Urgent Care':
        return faStethoscope;
      case 'Medical Center':
        return faHospital;
      case 'Health Center':
        return faFirstAid;
      case 'Clinic':
        return faClinicMedical;
      case 'Primary Care':
        return faUserMd;
      case 'Temporary':
        return faCampground;
      case 'Immediate Care':
        return faMedkit;
      case 'Public Health Department':
        return faShieldAlt;
      default:
        return faHospital;
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
  Object.keys(labelMap)
    .filter((key: string) => key !== 'is_verified')
    .forEach((key: string) => {
      details.push({
        type: 'boolean',
        title: labelMap[key].card,
        key,
        icon: labelMap[key].icon,
      });
    });
  const address = `${location.location_address_street.trim()}, ${location.location_address_locality.trim()}, ${location.location_address_region.trim()} ${location.location_address_postal_code.trim()}`;

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
            <div>
              <IconButton
                area-label="call"
                href={`tel://${location.location_contact_phone_main}`}
                onClick={() => {
                  handleLinkClicked(location.location_id, 'Call');
                }}
              >
                <PhoneIcon />
              </IconButton>
              <IconButton
                area-label="directions"
                href={`https://maps.google.com/?&daddr=${address}`}
                target="_blank"
              >
                <DirectionsIcon />
              </IconButton>
              {/* <IconButton area-label="share"> */}
              {/*  <ShareIcon /> */}
              {/* </IconButton> */}
              <IconButton
                area-label="report"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfYpEDiV8MwkBSVa7rKI_OzrmtGvclzgFzvcjxocLJncJOXDQ/viewform?usp=sf_link"
                target="_blank"
                onClick={() => {
                  handleLinkClicked(location.location_id, 'Report Error');
                }}
              >
                <ReportProblemIcon />
              </IconButton>
            </div>
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
            href={
              location.location_contact_url_covid_screening_tool !== ''
                ? location.location_contact_url_covid_screening_tool
                : 'https://www.apple.com/covid19/'
            }
            onClick={() => {
              handleLinkClicked(location.location_id, 'Website Click');
            }}
            target="_blank"
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <div
                  style={{
                    paddingTop: '20px',
                  }}
                >
                  <span
                    className="fa-layers fa-fw fa-4x"
                    style={{ width: '100%' }}
                  >
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
                      label={
                        location.location_place_of_service_type ===
                        'Public Health Department'
                          ? 'Public Health Dept.'
                          : location.location_place_of_service_type
                      }
                      className={classes.typeChip}
                    />
                  </div>
                </div>
              </Grid>
              <Grid key={1} item md={5} xs={12}>
                <Typography style={{ paddingTop: '20px' }}>
                  {'Visit '}
                  <Link href={location.location_contact_url_main}>
                    this website
                  </Link>
                  {
                    ' for information about COVID-19 screening and testing services at this location.'
                  }
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid key={2} item md={3} xs={12}>
                <List>
                  {details.map((item: any) => {
                    return location[item.key] === 'TRUE' ? (
                      <ListItem key={item.key}>
                        <ListItemAvatar>
                          <Avatar>
                            <FontAwesomeIcon icon={item.icon} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText secondary={item.title} />
                      </ListItem>
                    ) : null;
                  })}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Modal>
  );
};

export default LocationModal;
