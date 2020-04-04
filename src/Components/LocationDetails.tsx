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
  faCampground,
  faCircle,
  faClinicMedical,
  faFirstAid,
  faHospital,
  faMedkit,
  faShieldAlt,
  faStethoscope,
  faUserMd,
} from '@fortawesome/free-solid-svg-icons';
import { indigo, orange } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

  function renderLocationTestingDetails(locationToRender: any): any {
    if (
      locationToRender.location_specific_testing_criteria !== null &&
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

    let urlToRender = '';

    if (
      locationToRender.location_contact_url_main !== null &&
      locationToRender.location_specific_testing_criteria.substring(0, 4) ===
        'http'
    ) {
      urlToRender = locationToRender.location_contact_url_main;
    } else if (
      locationToRender.location_contact_url_covid_info !== null &&
      locationToRender.location_contact_url_covid_info.length > 3
    ) {
      urlToRender = locationToRender.location_contact_url_covid_info;
    } else if (
      locationToRender.location_contact_url_main !== null &&
      locationToRender.location_contact_url_main.length > 3
    ) {
      urlToRender = locationToRender.location_contact_url_main;
    } else {
      urlToRender =
        'https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/index.html#';
    }
    return (
      <Grid key={1} item md={5} xs={12}>
        <Typography style={{ paddingTop: '20px' }}>
          {'Visit '}
          <Link href={urlToRender} target="_blank" rel="noopener">
            this website
          </Link>
          {
            ' for information about COVID-19 screening and testing services at this location.'
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
