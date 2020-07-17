import { 
  IconButton, 
  Tooltip,
 } from '@material-ui/core';
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
  const raw_attributes = JSON.parse(location.raw_data);
  
  
  return (
    <div>
      {location.location_contact_phone_main !== null &&
      location.location_contact_phone_main.length > 4 ? (
        <Tooltip title={'Dial ' + location.location_contact_phone_main} placement="top" arrow>
          <IconButton
            area-label="call"
            href={`tel://${location.location_contact_phone_main}`}
            onClick={() => {
              onLinkClick(location.location_id, 'Call');
            }}
          >
            <PhoneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Main phone number unknown" placement="top" arrow>
          <span>
            <IconButton area-label="call" disabled>
              <PhoneDisabledIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Tooltip title="Get directions" placement="top" arrow>
        <IconButton
          area-label="directions"
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.location_latitude},${location.location_longitude}`}
          target="_blank"
          rel="noopener"
        >
          <DirectionsIcon />
        </IconButton>
      </Tooltip>
      {/* <IconButton area-label="share"> */}
      {/*  <ShareIcon /> */}
      {/* </IconButton> */}
      <Tooltip title="Report an error" placement="top" arrow>
        <IconButton
          area-label="report"
          href={`https://survey123.arcgis.com/share/913cbc92618746d3adf3c54b38798df7?mode=edit&globalId=${raw_attributes.global_id}&field:name=${encodeURIComponent(location.location_name)}`}
          target="_blank"
          rel="noopener"
          onClick={() => {
            onLinkClick(`${location.location_name}|${location.location_latitude},${location.location_longitude}|${location.global_id}`, 'Report Error');
          }}
        >
          <ReportProblemIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LocationActions;
