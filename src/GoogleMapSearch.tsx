import { StandaloneSearchBox, useGoogleMap } from '@react-google-maps/api';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const GoogleMapSearch = () => {
  const map = useGoogleMap();
  const [searchBox, setSearchBox] = useState<any>();

  const onLoad = (ref: any) => {
    console.log(`MOUNT${ref}`);
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox.getPlaces()[0] !== undefined) {
      map.fitBounds(searchBox.getPlaces()[0].geometry.viewport);
    }
  };

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <TextField
        placeholder="Search for a testing center"
        style={{
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          backgroundColor: 'white',
          outline: `none`,
          textOverflow: `ellipses`,
          position: 'absolute',
          top: '100px',
          left: '10px',
        }}
      />
    </StandaloneSearchBox>
  );
};

export default GoogleMapSearch;
