import { Marker, MarkerClusterer, useGoogleMap } from '@react-google-maps/api';
import React, { useContext, useEffect, useState } from 'react';
import fetchPins from '../../utils/fetchPins';
import { trackPinClicked } from '../../utils/tracking';
import { SearchContext } from '../../App';

interface GoogleMapPinsProps {
  onClickPin: Function;
}

export interface MarkerIconProps {
  path: string;
  fillColor: string;
  fillOpacity?: number;
  scale?: number | null;
  strokeColor?: string | null;
  strokeWeight?: number | null;
}

export const statusToColor = [
  {key: "Closed", value: { color: "#4f5d75", opacity: 0.5, scale: 0.8, path: 'M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L16,15.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z' }},
  {key: "Impacted", value: { color: "#540d6e", opacity: 0.4, scale: 1.0, path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z' }},
  {key: "Open", value: { color: "#540d6e", opacity: 0.8, scale: 1.0, path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z' }},
  {key: "Scheduled to Close", value: { color: "#f72585", opacity: 0.5, scale: 1.0, path: 'M12 2A7 7 0 0 0 5 9C5 14.25 12 22 12 22S19 14.25 19 9A7 7 0 0 0 12 2M7.5 10H10V5H14V10H16.5L12 14.5Z' }},
  {key: "Scheduled to Open", value: { color: "#f4d35e", opacity: 1.0, scale: 1.0, path: 'M12 2A7 7 0 0 0 5 9C5 14.25 12 22 12 22S19 14.25 19 9A7 7 0 0 0 12 2M16.5 9H14V14H10V9H7.5L12 4.5Z' }},
  {key: "Temporarily Closed", value: { color: "#0582ca", opacity: 0.4, scale: 1.0, path: 'M12,2C8.14,2 5,5.14 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.14 15.86,2 12,2M9.59,5.17L12,7.58L14.41,5.17L15.83,6.58L13.41,9L15.83,11.41L14.41,12.83L12,10.41L9.59,12.83L8.17,11.41L10.59,9L8.17,6.58' }},
  {key: "Testing Restricted", value: { color: "#fa7921", opacity: 0.9, scale: 1.0, path: 'M12,2C15.86,2 19,5.13 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M11,6V11H13V6H11M11,13V15H13V13H11Z' }},
  {key: "", value: { color: "#f94144", opacity: 1.0, scale: 1.0, path: 'M12,1C7.59,1 4,4.59 4,9C4,14.57 10.96,22.34 11.26,22.67L12,23.5L12.74,22.67C13.04,22.34 20,14.57 20,9C20,4.59 16.41,1 12,1M12,20.47C9.82,17.86 6,12.54 6,9A6,6 0 0,1 12,3A6,6 0 0,1 18,9C18,12.83 13.75,18.36 12,20.47M11.13,14H12.88V15.75H11.13M12,5A3.5,3.5 0 0,0 8.5,8.5H10.25A1.75,1.75 0 0,1 12,6.75A1.75,1.75 0 0,1 13.75,8.5C13.75,10.26 11.13,10.04 11.13,12.88H12.88C12.88,10.91 15.5,10.69 15.5,8.5A3.5,3.5 0 0,0 12,5Z' }},
]

const MarkerIcon = ((k: string): MarkerIconProps => {
  let color: string = "f94144";
  let opacity: number = 1.0;
  let scale: number = 1.0;
  let path: string = 'M12,1C7.59,1 4,4.59 4,9C4,14.57 10.96,22.34 11.26,22.67L12,23.5L12.74,22.67C13.04,22.34 20,14.57 20,9C20,4.59 16.41,1 12,1M12,20.47C9.82,17.86 6,12.54 6,9A6,6 0 0,1 12,3A6,6 0 0,1 18,9C18,12.83 13.75,18.36 12,20.47M11.13,14H12.88V15.75H11.13M12,5A3.5,3.5 0 0,0 8.5,8.5H10.25A1.75,1.75 0 0,1 12,6.75A1.75,1.75 0 0,1 13.75,8.5C13.75,10.26 11.13,10.04 11.13,12.88H12.88C12.88,10.91 15.5,10.69 15.5,8.5A3.5,3.5 0 0,0 12,5Z';
  
  // 
  statusToColor.forEach((s) => { 
    if (s.key === k) {
      color = s.value.color;
      opacity = s.value.opacity;
      scale = s.value.scale;
      path = s.value.path;
    }
  });
  
  return {
    path: path,
    fillColor: color,
    fillOpacity: opacity,
    strokeColor: color,
    strokeWeight: 1,
    scale: scale,
  }
  }
);

const MapPins = ({ onClickPin }: GoogleMapPinsProps) => {
  const map = useGoogleMap();

  const searchFilters = useContext(SearchContext);

  const [pinData, setPinData] = useState([]);
  
  useEffect(() => {
    fetchPins(searchFilters).then(setPinData);
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
        gridSize={120}
        minimumClusterSize={1500}
        ignoreHidden
        maxZoom={8}
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
            />
          ))}
      </MarkerClusterer>
    </div>
  );
};

export default MapPins;
