import { IconButton } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import DirectionsIcon from '@material-ui/icons/Directions';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import React from 'react';

interface LocationActionsProps {
  location: any;
  onLinkClick: Function;
}

const LocationActions = ({ location, onLinkClick }: LocationActionsProps) => {
  return (
    <div>
      {location.location_contact_phone_main !== null &&
      location.location_contact_phone_main.length > 4 ? (
        <IconButton
          area-label="call"
          href={`tel://${location.location_contact_phone_main}`}
          onClick={() => {
            onLinkClick(location.location_id, 'Call');
          }}
        >
          <PhoneIcon />
        </IconButton>
      ) : (
        <IconButton area-label="call" disabled>
          <PhoneDisabledIcon />
        </IconButton>
      )}
      <IconButton
        area-label="directions"
        href={`https://www.google.com/maps/dir/?api=1&destination=${location.location_latitude},${location.location_longitude}`}
        target="_blank"
        rel="noopener"
      >
        <DirectionsIcon />
      </IconButton>
      {/* <IconButton area-label="share"> */}
      {/*  <ShareIcon /> */}
      {/* </IconButton> */}
      <IconButton
        area-label="report"
        href="https://docs.google.com/forms/d/e/1FAIpQLSd2xzEXfJdNJIGh5MDhxg217-p_MXvSREOuQT_P_vwrqSjEMQ/viewform?usp=sf_link"
        target="_blank"
        rel="noopener"
        onClick={() => {
          onLinkClick(location.location_id, 'Report Error');
        }}
      >
        <ReportProblemIcon />
      </IconButton>
    </div>
  );
};

export default LocationActions;
