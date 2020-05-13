import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';
import { isMobile } from "react-device-detect";
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
};

interface GeoPoint {
  latitude: number;
  longitude: number;
};

const defaultCenter: GeoPoint = {
    latitude: -95.778071, 
    longitude: 39.0131669,
};

const Map = React.memo(
  ({ onClickPin, setMap }: MapWithGoogleProps) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: REACT_APP_GCP_MAPS_API_KEY,
      libraries,
    });

    function geoIPFallback(mapInstance: any) {
      var userLocation = defaultCenter;
      function updateMapView(lat: number = userLocation.latitude, lng: number = userLocation.longitude) {
        mapInstance.panTo({ lat: lat, lng: lng });
        mapInstance.setZoom(8);
        
        dataLayer.push({
          event: 'pageview',
          location: userLocation,
        });
      }
      
      trackLocationPrompt('Attempt');
      fetch(
        'https://pro.ip-api.com/json/?fields=status,lat,lon&key=WNyJJH2siHnfQU0'
        )
        .then((r: Response) => r.json())
        .then((data) => {
          if (data.status === 'success') {
            userLocation = { latitude: data.lat, longitude: data.lon };
            updateMapView();
            trackLocationPrompt('Success');
            trackUserLocation(userLocation.latitude, userLocation.longitude);
          }
          else {
            console.error('Unrecognized status received during geolocation:\n', data.status);
            updateMapView();
            trackLocationPrompt(`Failed|${data.status}`);
          }
        })
        .catch((reason: any) => {
          updateMapView();
          trackLocationPrompt(`Failed|${reason}`);
        })
    }

    function locateUser(mapInstance: any) {
      navigator.geolocation.getCurrentPosition(
        (res: GeolocationCoordinates) => {
          const { latitude, longitude } = res.coords;
          mapInstance.panTo({ lat: latitude, lng: longitude });
          mapInstance.setZoom(8);
          
          dataLayer.push({
            event: 'pageview',
            location: {
              latitude,
              longitude,
            },
          });
          trackUserLocation(latitude, longitude);
        },
        (e: any) => {
          geoIPFallback(mapInstance);
        },
        {
          enableHighAccuracy: true,
          timeout: (isMobile) ? 5000 : 2000,
        }
      );
    }

    const onLoad = React.useCallback(function onLoad(mapInstance) {
      setMap(mapInstance);
      try {
        locateUser(mapInstance);
      } catch (e) {
        console.error('failed to locate user', e);
        mapInstance.panTo({ lat: defaultCenter.latitude, lng: defaultCenter.longitude });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMap = () => {
      return (
        <GoogleMap
          id="covid-map"
          center={{ lat: -95.778071, lng: 39.0131669 }}
          zoom={3}
          onLoad={onLoad}
          mapContainerStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
