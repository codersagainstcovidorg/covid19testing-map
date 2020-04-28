import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';
import MapPins from './MapPins';
import { trackLocationPrompt, trackUserLocation } from '../../utils/tracking';

const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

interface MapWithGoogleProps {
  onClickPin: Function;
  setMap: Function;
}
const libraries = ['places'];

const dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer = (window as any).dataLayer || [];

interface GeolocationCoordinates {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

const Map = React.memo(
  ({ onClickPin, setMap }: MapWithGoogleProps) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: REACT_APP_GCP_MAPS_API_KEY,
      libraries,
    });

    function geoIPFallback(mapInstance: any) {
      trackLocationPrompt('Attempt');

      fetch(
        'https://pro.ip-api.com/json/?fields=status,lat,lon&key=WNyJJH2siHnfQU0'
      )
        .then((r: Response) => r.json())
        .then((data) => {
          if (data.status === 'success') {
            const { lat, lon } = data;
            trackLocationPrompt('Success');

            trackUserLocation(lat, lon);
            dataLayer.push({
              event: 'pageview',
              location: {
                latitude: lat,
                longitude: lon,
              },
            });
            mapInstance.setZoom(8);
            mapInstance.panTo({ lat, lng: lon });
          }
        });
    }

    function locateUser(mapInstance: any) {
      navigator.geolocation.getCurrentPosition(
        (res: GeolocationCoordinates) => {
          const { latitude, longitude } = res.coords;
          trackUserLocation(latitude, longitude);

          dataLayer.push({
            event: 'pageview',
            location: {
              latitude,
              longitude,
            },
          });
          mapInstance.setZoom(8);
          mapInstance.panTo({ lat: latitude, lng: longitude });
          // setViewState({
          //   latitude: lat,
          //   longitude: lon,
          //   zoom: 8,
          //   bearing: 0,
          //   pitch: 0,
          // });
        },
        (e: any) => {
          console.error('failed to get location from browser', e);
          geoIPFallback(mapInstance);
        },
        {
          enableHighAccuracy: true,
          timeout: 2000,
        }
      );
    }

    const onLoad = React.useCallback(function onLoad(mapInstance) {
      setMap(mapInstance);
      try {
        locateUser(mapInstance);
      } catch (e) {
        console.error('failed to locate user', e);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMap = () => {
      return (
        <GoogleMap
          id="covid-map"
          zoom={3}
          onLoad={onLoad}
          mapContainerStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          center={{
            lat: 101.71491405154,
            lng: 36.8350816095506,
          }}
          clickableIcons={false}
        >
          <MapPins onClickPin={onClickPin} />
        </GoogleMap>
      );
    };

    if (loadError) {
      return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? renderMap() : <div />;
  },
  (prevProps, nextProps) => {
    return prevProps.setMap === nextProps.setMap;
  }
);

export default Map;
