import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';
import GoogleMapSearch from './GoogleMapSearch';
import GoogleMapPins from './GoogleMapPins';

const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

interface MapWithGoogleProps {
  onClickPin: Function;
}
const libraries = ['places'];

function MapWithGoogle({ onClickPin }: MapWithGoogleProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GCP_MAPS_API_KEY,
    libraries,
  });
  const onLoad = React.useCallback(function onLoad(mapInstance) {
    console.log(mapInstance);
  }, []);
  const renderMap = () => {
    return (
      <GoogleMap
        id="covid-map"
        zoom={2}
        onLoad={onLoad}
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
        <GoogleMapPins onClickPin={onClickPin} />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div />;
}

export default MapWithGoogle;
