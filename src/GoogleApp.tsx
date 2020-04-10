import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';
import GoogleMapSearch from './GoogleMapSearch';
import GoogleMapPins from './GoogleMapPins';

const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

const GoogleApp = () => {
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
              height: '100vh',
              width: '100vw',
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

export default GoogleApp;
