import { Marker, MarkerClusterer, useGoogleMap } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import fetchPins from '../../utils/fetchPins';

interface GoogleMapPinsProps {
  onClickPin: Function;
}

const MapPins = ({ onClickPin }: GoogleMapPinsProps) => {
  const map = useGoogleMap();

  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    fetchPins().then(setPinData);
  }, []);

  function pinClicked(e: any, place: any) {
    onClickPin(place);
    map.panTo(e.latLng);
  }

  return (
    <div>
      <MarkerClusterer>
        {(clusterer) =>
          pinData.map((place: any) => (
            <Marker
              key={`marker-${place.location_id}`}
              position={{
                lng: place.location_longitude,
                lat: place.location_latitude,
              }}
              clusterer={clusterer}
              onClick={(e) => {
                pinClicked(e, place);
              }}
            />
          ))}
      </MarkerClusterer>
    </div>
  );
};

export default MapPins;
