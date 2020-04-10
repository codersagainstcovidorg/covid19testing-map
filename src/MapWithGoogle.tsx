import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';
import GoogleMapSearch from './GoogleMapSearch';
import GoogleMapPins from './GoogleMapPins';

const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

const MapWithGoogle = () => {
  const onClick = (args: any) => {
    console.log('onClick args: ', args);
  };

  return (
    <div className="map">
      <div className="map-container">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={REACT_APP_GCP_MAPS_API_KEY}
          libraries={['places']}
        >
          <GoogleMap
            id="covid-map"
            zoom={2}
            onClick={onClick}
            mapContainerStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            center={{
              lat: -3.745,
              lng: -38.523,
            }}
          >
            <GoogleMapSearch />
            <GoogleMapPins />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapWithGoogle;
