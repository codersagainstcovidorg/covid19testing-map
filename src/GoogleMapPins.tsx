import { Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import fetchPins from './utils/fetchPins';
import LocationPin from './Components/Map/LocationPin';

const GoogleMapPins = () => {
  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    fetchPins().then(setPinData);
  }, []);

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
          />
        );
      })}
    </div>
  );
};

export default GoogleMapPins;
