import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useEffect } from 'react';
import GoogleMapSearch from './GoogleMapSearch';
import GoogleMapPins from './GoogleMapPins';

const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

interface MapWithGoogleProps {
  onClickPin: Function;
  setMap: Function;
}
const libraries = ['places'];

const MapWithGoogle = React.memo(
  ({ onClickPin, setMap }: MapWithGoogleProps) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: REACT_APP_GCP_MAPS_API_KEY,
      libraries,
    });

    const onLoad = React.useCallback(function onLoad(mapInstance) {
      console.log('Map loaded');
      setMap(mapInstance);
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
          <GoogleMapPins onClickPin={onClickPin} />
        </GoogleMap>
      );
    };

    if (loadError) {
      return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? renderMap() : <div />;
  },
  (prevProps, nextProps) => {
    console.log('Previous', prevProps);
    console.log('New', nextProps);
    return prevProps.setMap === nextProps.setMap;
  }
);

export default MapWithGoogle;
