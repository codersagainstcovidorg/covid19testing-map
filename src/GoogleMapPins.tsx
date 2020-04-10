import { Marker, useGoogleMap } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import fetchPins from './utils/fetchPins';
import { trackLinkClicked } from './utils/tracking';

interface GoogleMapPinsProps {
  onClickPin: Function;
}

const GoogleMapPins = ({ onClickPin }: GoogleMapPinsProps) => {
  const map = useGoogleMap();

  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    fetchPins().then(setPinData);
  }, []);

  function pinClicked(e: any, place: any) {
    console.log(e);
    map.panTo(e.latLng);
    onClickPin(place);
  }

  return (
    <div>
      {pinData.map((place: any, index: number) => {
        /* eslint-disable react/no-array-index-key */
        return (
          <Marker
            key={`marker-${index}`}
            position={{
              lng: place.location_longitude,
              lat: place.location_latitude,
            }}
            onClick={(e) => {
              pinClicked(e, place);
            }}
          />
        );
      })}
    </div>
  );
};

export default GoogleMapPins;
