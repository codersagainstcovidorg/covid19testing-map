import { IconButton } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsIcon from '@material-ui/icons/Directions';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import React from 'react';

interface LocationActionsProps {
  location: any;
  onLinkClick: Function;
  address: string;
}

const LocationActions = ({
  location,
  onLinkClick,
  address,
}: LocationActionsProps) => {
  return (
    <div>
      <IconButton
        area-label="call"
        href={`tel://${location.location_contact_phone_main}`}
        onClick={() => {
          onLinkClick(location.location_id, 'Call');
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
          onLinkClick(location.location_id, 'Report Error');
        }}
      >
        <ReportProblemIcon />
      </IconButton>
    </div>
  );
};

export default LocationActions;
