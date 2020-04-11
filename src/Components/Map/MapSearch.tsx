import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import { createStyles, Input, InputAdornment, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { trackUiClick } from '../../utils/tracking';

const libraries = ['places'];
const { REACT_APP_GCP_MAPS_API_KEY } = process.env;

interface SearchProps {
  map: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: '30vw',
      marginLeft: theme.spacing(1),
    },
  })
);

const MapSearch = ({ map }: SearchProps) => {
  const classes = useStyles();

  const [searchBox, setSearchBox] = useState<any>();

  const onLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox.getPlaces()[0] !== undefined) {
      map.fitBounds(searchBox.getPlaces()[0].geometry.viewport);
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GCP_MAPS_API_KEY,
    libraries,
  });

  const handleSearchClick = React.useCallback(() => {
    trackUiClick('Search');
  }, []);

  const renderSearchBox = () => {
    return (
      <div id="search-input">
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <Input
            placeholder="Search Google Maps"
            className={classes.input}
            inputProps={{ 'aria-label': 'search google maps' }}
            onClick={handleSearchClick}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </StandaloneSearchBox>
      </div>
    );
  };
  if (loadError) {
    return <div>Search bar cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderSearchBox() : <div />;
};

export default MapSearch;
