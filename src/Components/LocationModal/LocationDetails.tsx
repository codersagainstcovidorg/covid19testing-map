import {
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import React from 'react';
import { trackUiClick } from '../../utils/tracking';
import ReactGA from 'react-ga';

interface DetailsProps {
  location: any;
  expanded: boolean;
  details: any;
}

const LocationDetails = ({ location, expanded, details }: DetailsProps) => {
function renderLocationTestingDetails(locationToRender: any): any {
    if (locationToRender.location_specific_testing_criteria !== null) {
      if (
        locationToRender.location_specific_testing_criteria.substring(0, 4) !==
          'http' &&
        locationToRender.location_specific_testing_criteria.length > 3
      ) {
        return (
          <Grid key={1} item md={12} xs={12}>
            <div style={{ marginTop: '10px' }}>
              {location.location_specific_testing_criteria.split('\\n').map((i: any, key: number) => {
                return <Typography key={key} paragraph variant="body2" component="p">{i}</Typography>;
              })}
            </div>
          </Grid>
        );
      }
    }

    const trackLocationWebsiteClick = () => {
      trackUiClick('Location Website', locationToRender.location_name + '|' + locationToRender.location_latitude + '|' + locationToRender.location_longitude + '|' + locationToRender.location_id);
    };

    // If there are specific instructions involving testing, then display those, and move on.
    if (
      locationToRender.location_specific_testing_criteria !== null &&
      locationToRender.location_specific_testing_criteria.substring(0, 4) !==
        'http'
    ) {
      return (
      <Grid key={1} item md={5} xs={12}>
        <div style={{ marginTop: '10px' }}>
          {location.location_specific_testing_criteria.split('\\n').map((i: any, key: number) => {
            return <Typography key={key} paragraph variant="body1" component="p">{i}</Typography>;
          })}
        </div>
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
          <Typography style={{ marginTop: '10px' }}>
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
      <Grid key={2} item md={5} xs={12}>
        <Typography style={{ marginTop: '10px' }}>
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

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid key={1} item md={12} xs={12}>
            <div style={{ paddingTop: '20px' }}>
              {location.additional_information_for_patients.split('\\n').map((i: any, key: number) => {
                return <Typography key={key} paragraph variant="body1" component="p">{i}</Typography>;
              })}
            </div>
          </Grid>
          
          {renderLocationTestingDetails(location)}
          
          <Divider orientation="horizontal" flexItem />
          <Grid item md={12} xs={12}>
            <Typography color="textPrimary" variant="caption" style={{ paddingTop: '20px',paddingBottom: '20px' }}>
              {'\nSource: '}
              <ReactGA.OutboundLink
                  eventLabel={'OutboundLink | Source | ' + location.location_contact_url_main }
                  to={location.location_contact_url_main}
                  target="_blank"
                >
                  {location.location_contact_url_main}
              </ReactGA.OutboundLink>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Collapse>
  );
};

export default LocationDetails;
