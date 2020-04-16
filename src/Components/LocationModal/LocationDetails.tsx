import React from 'react';
import ReactGA from 'react-ga';
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
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { indigo, orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { TESTING_CRITERIA_URL_CDC } from '../../constants';
import { LocationType, 
  PlaceOfServiceType, } from '../Types/LocationType';
import { isDescriptionLike } from '../../utils/helperMethods';

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
  location: LocationType;
  expanded: boolean;
  details: any;
}

const LocationDetails = ({ location, expanded, details }: DetailsProps) => {
  const classes = useStyles();

  function renderLocationTestingDetails(locationToRender: LocationType): any {
    // // if (isURLLike(locationToRender.keys.location_specific_testing_criteria)) {
    // //   return (
    // //     <Grid key={1} item md={5} xs={12}>
    // //       <Typography style={{ paddingTop: '20px' }}>
    // //         {locationToRender.keys.location_specific_testing_criteria}
    // //       </Typography>
    // //     </Grid>
    // //   );
    // // }

    // const trackLocationWebsiteClick = () => {
    //   trackUiClick('Location Website', locationToRender.keys.location_id);
    // };

    // If location does NOT require/apply testing criteria then we're done
    if (locationToRender.doesApplyTestingCriteria() == false) {
      return (
        <Grid key={1} item md={5} xs={12}>
          <Typography style={{ paddingTop: '20px' }}>
            {'Published testing criteria that is specific to this location could not be found. '}
            {'This is common when CDC guidelines are in effect, but we recommend calling ahead to confirm.'}
          </Typography>
        </Grid>
      ); 
    } else {
      // Otherwise, figure out what to display
      let testingCriteriaValue = locationToRender.getTestingCriteria();
      
      // If there are specific instructions involving testing, then display those, and move on.
      if (isDescriptionLike(testingCriteriaValue)) {
        return (
        <Grid key={1} item md={5} xs={12}>
          <Typography style={{ paddingTop: '20px' }}>
            {testingCriteriaValue}
          </Typography>
        </Grid>
        );
      } else {
        // Otherwise, render a message sending users to the CDC.
        return (
          <Grid key={1} item md={5} xs={12}>
            <Typography style={{ paddingTop: '20px' }}>
              {'Testing at this location is only offered to individuals that meet specific criteria, but there does not \
                appear to be a document with details available. You can try reviewing '}
              <ReactGA.OutboundLink
                eventLabel="Location Details: CDC Testing Criteria"
                to={TESTING_CRITERIA_URL_CDC}
                target="_blank"
                >
                CDC guidelines
              </ReactGA.OutboundLink>
              { ', but remember that final decisions about testing are at the discretion of state and local health \
                  departments and/or individual clinicians.'
              }
            </Typography>
          </Grid>
        );
      }
    }
  }
  
  const locationPlaceOfService: PlaceOfServiceType = location.getPlaceOfService()
  
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
                  icon={ locationPlaceOfService.icon }
                  transform="shrink-6"
                  color="white"
                />
              </span>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Chip
                  size="medium"
                  label={locationPlaceOfService.kind.valueOf }
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
