import { Marker, MarkerClusterer, useGoogleMap } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';
import fetchPins from '../../utils/fetchPins';
import { trackPinClicked } from '../../utils/tracking';
import { SearchContext } from '../../App';

interface GoogleMapPinsProps {
  onClickPin: Function;
}

const MapPins = ({ onClickPin }: GoogleMapPinsProps) => {
  const map = useGoogleMap();

  const searchFilters = useContext(SearchContext);

  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    console.log('fetching pins', searchFilters);
    fetchPins(searchFilters).then(setPinData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters]);

  function pinClicked(e: any, place: any) {
    trackPinClicked(place.location_id);
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
