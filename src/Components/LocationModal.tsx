import React from 'react';
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
import { labelMap } from '../App';
import LocationDetails from './LocationDetails';
import LocationActions from './LocationActions';

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
}

const LocationModal = ({ location, onClose }: LocationModalProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

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
            href={
              location.location_contact_url_covid_screening_tool === '' ||
              location.location_contact_url_covid_screening_tool === null
                ? 'https://www.apple.com/covid19/'
                : location.location_contact_url_covid_screening_tool
            }
            onClick={() => {
              handleLinkClicked(location.location_id, 'Website Click');
            }}
            target="_blank"
            rel="noopener"
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
      </Card>
    </Modal>
  );
};

export default LocationModal;
