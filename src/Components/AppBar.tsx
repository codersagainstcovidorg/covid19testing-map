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
import { ADD_LOCATION_FORM } from '../constants';

const SearchContainer = styled.div`
  position: relative;
`;

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
  toggleDrawer: () => void;
};

const AppBar = (props: AppBarProps) => {
  const { geocoderContainerRef, toggleDrawer } = props;

  return (
    <MuiAppBar position="relative" color="default">
      <Toolbar>
        <SearchContainer ref={geocoderContainerRef} />

        <ActionButtonContainer>
          <Fab onClick={toggleDrawer} color="primary">
            <AssistantIcon />
          </Fab>
        </ActionButtonContainer>

        <Spacer />

        <Tooltip title="Add a new location" placement="top" arrow>
          <IconButton
            color="inherit"
            href={ADD_LOCATION_FORM}
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
