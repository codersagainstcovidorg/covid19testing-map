import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AssistantIcon from '@material-ui/icons/Assistant';
import styled from 'styled-components';
import MoreButton from './MoreButton';
import MapSearch from '../Map/MapSearch';
import { ADD_LOCATION_FORM } from '../../constants';
import { trackUiClick } from '../../utils/tracking';

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

type AppBarProps = {
  geocoderContainerRef: any;
  toggleGuide: () => void;
  map: any;
};

const AppBar = (props: AppBarProps) => {
  const { toggleGuide, map } = props;

  const handleAddLocationClick = React.useCallback(() => {
    trackUiClick('Add Location');
  }, []);

  return (
    <MuiAppBar position="relative" color="default">
      <Toolbar>
        <MapSearch map={map} />

        <ActionButtonContainer>
          <Tooltip title="Personalize" placement="top">
            <Fab onClick={toggleGuide} color="primary">
              <AssistantIcon />
            </Fab>
          </Tooltip>
        </ActionButtonContainer>

        <Spacer />

        <Tooltip title="Add a new location" placement="top" arrow>
          <IconButton
            color="inherit"
            href={ADD_LOCATION_FORM}
            onClick={handleAddLocationClick}
            target="_blank"
            rel="noopener"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <MoreButton />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
