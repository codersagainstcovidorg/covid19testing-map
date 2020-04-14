import {
  Avatar,
  CardContent,
  Chip,
  Collapse,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAmbulance,
  faCampground,
  faCarSide,
  faCircle,
  faClinicMedical,
  faFirstAid,
  faHospital,
  faHospitalAlt,
  faMedkit,
  faShieldAlt,
  faStethoscope,
  faStore,
  faUserMd,
} from '@fortawesome/free-solid-svg-icons';
import { indigo, orange } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { trackUiClick } from '../../utils/tracking';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typeChip: {
      backgroundColor: orange[900],
      color: theme.palette.getContrastText(indigo[800]),
      height: '20px',
      marginTop: '5px',
    },
  })
);

interface DetailsProps {
  location: any;
  expanded: boolean;
  details: any;
}

const LocationDetails = ({ location, expanded, details }: DetailsProps) => {
  const classes = useStyles();

  function getLocationName(param: String): String {
    if (param === null || param === undefined || param.length < 4) {
      return 'Other';
    }
    if (param === 'Public Health Department') {
      return 'Public Health Dept.';
    }
    return param;
  }

  function renderLocationTestingDetails(locationToRender: any): any {
    if (locationToRender.location_specific_testing_criteria !== null) {
      if (
        locationToRender.location_specific_testing_criteria.substring(0, 4) !==
          'http' &&
        locationToRender.location_specific_testing_criteria.length > 3
      ) {
        return (
          <Grid key={1} item md={5} xs={12}>
            <Typography style={{ paddingTop: '20px' }}>
              {locationToRender.location_specific_testing_criteria}
            </Typography>
          </Grid>
        );
      }
    }

    const trackLocationWebsiteClick = () => {
      trackUiClick('Location Website', locationToRender.location_id);
    };

    // If there are specific instructions involving testing, then display those, and move on.
    if (
      locationToRender.location_specific_testing_criteria !== null &&
      locationToRender.location_specific_testing_criteria.substring(0, 4) !==
        'http'
    ) {
      return (
      <Grid key={1} item md={5} xs={12}>
        <Typography style={{ paddingTop: '20px' }}>
          {locationToRender.location_specific_testing_criteria}
        </Typography>
      </Grid>
      );
    }
    
    // Otherwise, figure out which URL to display
    let urlToRender = '';
    
    // If location does NOT require/apply testing criteria then we're done
    if (
      locationToRender.is_ordering_tests_only_for_those_who_meeting_criteria !== true &&
      (locationToRender.reference_publisher_of_criteria === null ||
      locationToRender.reference_publisher_of_criteria.length < 3)
      ) {
      return (
        <Grid key={1} item md={5} xs={12}>
          <Typography style={{ paddingTop: '20px' }}>
            {'Published testing criteria that is specific to this location could not be found. '}
            {'This is common when CDC guidelines are in effect, but we recommend calling ahead to confirm.'}
          </Typography>
        </Grid>
      ); 
    }
    
    if (
      locationToRender.location_specific_testing_criteria !== null &&
      locationToRender.location_specific_testing_criteria.substring(0, 4) === 'http'
    ) {
      urlToRender = locationToRender.location_specific_testing_criteria;
    } else if (
      locationToRender.location_contact_url_covid_info !== null &&
      locationToRender.location_contact_url_covid_info.substring(0, 4) === 'http'
    ) {
      urlToRender = locationToRender.location_contact_url_covid_info;
    } else if (
      locationToRender.location_contact_url_main !== null &&
      locationToRender.location_contact_url_main.substring(0, 4) === 'http'
    ) {
      urlToRender = locationToRender.location_contact_url_main;
    } else {
      urlToRender =
        'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/index.html#';
    }
    return (
      <Grid key={1} item md={5} xs={12}>
        <Typography style={{ paddingTop: '20px' }}>
          {'Testing at this location is only offered to individuals that '}
          <Link
            onClick={trackLocationWebsiteClick}
            href={urlToRender}
            target="_blank"
            rel="noopener"
          >
            meet specific criteria
          </Link>
          {
            '. All others will be turned away.'
          }
        </Typography>
      </Grid>
    );
  }

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
      case 'Drive-thru':
        return faCarSide;
      case 'Emergency Room':
        return faAmbulance;
      case 'FQHC':
        return faHospitalAlt;
      case 'Retail':
        return faStore;
      default:
        return faHospital;
    }
  }

  return (
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
          </Grid>
          {renderLocationTestingDetails(location)}
          <Divider orientation="vertical" flexItem />
          <Grid key={2} item md={3} xs={12}>
            <List>
              {details.map((item: any) => {
                return location[item.key] === true ? (
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
  );
};

export default LocationDetails;
