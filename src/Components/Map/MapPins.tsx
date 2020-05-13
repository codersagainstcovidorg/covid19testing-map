import { Marker, MarkerClusterer, useGoogleMap } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';
import fetchPins from '../../utils/fetchPins';
import { trackPinClicked } from '../../utils/tracking';
import { SearchContext } from '../../App';

interface GoogleMapPinsProps {
  onClickPin: Function;
}

interface MarkerIconProps {
  path: string;
  fillColor: string;
  fillOpacity?: number;
  scale?: number | null;
  strokeColor?: string | null;
  strokeWeight?: number | null;
}

const statusToColor = [
  {key: "Closed", value: { color: "#4f5d75", opacity: 0.5 }},
  {key: "Impacted", value: { color: "#577590", opacity: 0.5 }},
  {key: "Open", value: { color: "#f3722c", opacity: 0.5 }},
  {key: "Scheduled to Close", value: { color: "#bfc0c0", opacity: 0.5 }},
  {key: "Scheduled to Open", value: { color: "#fa7921", opacity: 0.5 }},
  {key: "Temporarily Closed", value: { color: "#9bc53d", opacity: 0.5 }},
  {key: "Testing Restricted", value: { color: "#0582ca", opacity: 0.5 }},
  {key: "", value: { color: "#f94144", opacity: 1.0 }},
]

const MarkerIcon = ((k: string): MarkerIconProps => {
  let color: string = "f94144";
  let opacity: number = 1.0;
  
  statusToColor.forEach((s) => { 
    if (s.key === k) {
      color = s.value.color;
      opacity = s.value.opacity;
    }
  });
  
  return {
    path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
    fillColor: color,
    fillOpacity: opacity,
    strokeColor: color,
    strokeWeight: 1,
    scale: 1,
  }
  }
);

const MapPins = ({ onClickPin }: GoogleMapPinsProps) => {
  const map = useGoogleMap();

  const searchFilters = useContext(SearchContext);

  const [pinData, setPinData] = useState([]);

  useEffect(() => {
    fetchPins(searchFilters).then(setPinData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters]);

  function pinClicked(e: any, place: any) {
    trackPinClicked(place.location_name + '|' + (place.location_address_locality ?? place.location_address_region) + '|' + place.location_latitude + '|' + place.location_longitude + '|' + place.location_id);
    onClickPin(place);
    map.panTo(e.latLng);
  }

  return (
    <div>
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
        minimumClusterSize={15}
        ignoreHidden
      >
        {(clusterer) =>
          pinData.map((place: any) => (
            <Marker
              key={`marker-${place.location_id}`}
              position={{
                lng: place.location_longitude,
                lat: place.location_latitude,
              }}
              cursor="pointer"
              clusterer={clusterer}
              onClick={(e) => {
                pinClicked(e, place);
              }}
              icon={MarkerIcon(place.location_status)}
              title={`${place.location_name} (${place.location_status})`}
              opacity={(JSON.parse(place.raw_data).is_flagged) ? 0.5 : 1.0}
            />
          ))}
      </MarkerClusterer>
    </div>
  );
};

export default MapPins;
