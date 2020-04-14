import React, { useState } from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AssistantIcon from '@material-ui/icons/Assistant';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import MoreButton from './MoreButton';
import MapSearch from '../Map/MapSearch';
import { ADD_LOCATION_FORM_URL } from '../../constants';
import { trackUiClick } from '../../utils/tracking';
import ShortQuestionAlert from '../LocationModal/ShortQuestionAlert';

type AppBarPropType = {
  geocoderContainerRef: any;
  toggleGuide: () => void;
  map: any;
  filterApplied: boolean;
  clearFilters: Function;
};

const ActionButtonContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: -24px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Spacer = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
`;

const AppBar = (props: AppBarPropType) => {
  const { toggleGuide, map, filterApplied, clearFilters } = props;
  const [showClearFilterDialog, setShowClearFilterDialog] = useState(false);
  const handleAddLocationClick = React.useCallback(() => {
    trackUiClick('Add Location');
  }, []);

  return (
    <MuiAppBar position="relative" color="default">
      <Toolbar>
        <MapSearch map={map} />

        <ActionButtonContainer>
          {filterApplied ? (
            <Tooltip title="Clear Filters" placement="top">
              <Fab
                onClick={() => {
                  setShowClearFilterDialog(true);
                }}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                <CloseIcon />
              </Fab>
            </Tooltip>
          ) : (
            <Tooltip title="Personalize" placement="top">
              <Fab onClick={toggleGuide} color="primary">
                <AssistantIcon />
              </Fab>
            </Tooltip>
          )}
        </ActionButtonContainer>

        <Spacer />

        <Tooltip title="Add a new location" placement="top" arrow>
          <IconButton
            color="inherit"
            href={ADD_LOCATION_FORM_URL}
            onClick={handleAddLocationClick}
            target="_blank"
            rel="noopener"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <MoreButton />
      </Toolbar>
      <ShortQuestionAlert
        showAlert={showClearFilterDialog}
        yesSelected={() => {
          setShowClearFilterDialog(false);
          clearFilters();
        }}
        noSelected={() => {
          setShowClearFilterDialog(false);
        }}
      >
        Are you sure you want to clear all the filters? This will reset the map
        to it's default state.
      </ShortQuestionAlert>
    </MuiAppBar>
  );
};

export default AppBar;
