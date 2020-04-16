import { IconButton, Tooltip } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import DirectionsIcon from '@material-ui/icons/Directions';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import React from 'react';
import { ContactKind,
  ContactPurpose,
  LocationType, } from '../Types/LocationType';
import { isValueSafe } from '../../utils/helperMethods';

interface LocationActionsProps {
  location: LocationType;
  onLinkClick: Function;
}

const LocationActions = ({ location, onLinkClick }: LocationActionsProps) => {
  const mainPhone: string | null = location.getContact(ContactKind.Phone, ContactPurpose.SeekGeneralInfo);
  return (
    <div>
      
      { isValueSafe(mainPhone) ? (
        <Tooltip title="Dial main phone number" placement="top" arrow>
          <IconButton
            area-label="call"
            href={`tel://${mainPhone}`}
            onClick={() => {
              onLinkClick(location.keys.location_id, 'Call');
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
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.keys.location_latitude},${location.keys.location_longitude}`}
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
          href="https://docs.google.com/forms/d/e/1FAIpQLSd2xzEXfJdNJIGh5MDhxg217-p_MXvSREOuQT_P_vwrqSjEMQ/viewform?usp=sf_link"
          target="_blank"
          rel="noopener"
          onClick={() => {
            onLinkClick(location.keys.location_id, 'Report Error');
          }}
        >
          <ReportProblemIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LocationActions;
