import React from 'react';
import styled from 'styled-components';
import {
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Link,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import MenuIcon from '@material-ui/icons/Menu';
import { ADD_LOCATION_FORM } from '../constants';

const InfoPrompt = styled(Alert)`
  border-radius: 0 !important;
  min-height: 63px;
`;

const HeaderToolbar = styled(Toolbar)`
  padding: 0 7px;
  font-family: 'Roboto,Helvetica,Arial,sans-serif';
  font-weight: bold;
  min-height: 40px;
`;

const DrawerIcon = styled(MenuIcon)`
  color: white;
  margin-left: -4px;
`;

const HeaderText = styled(Typography)`
  font-size: 1.3rem;
`;

const AlertText = styled.div``;

type HeaderProps = {
  showToolbar: boolean;
  toggleDrawer: Function;
};

const Header = ({ showToolbar, toggleDrawer }: HeaderProps) => (
  <AppBar position="static">
    {showToolbar && (
      <HeaderToolbar variant="dense">
        <IconButton onClick={() => toggleDrawer()}>
          <DrawerIcon />
        </IconButton>

        <HeaderText variant="h5">Find Covid Testing</HeaderText>
      </HeaderToolbar>
    )}

    <InfoPrompt variant="filled" severity="info">
      <AlertTitle>
        Thanks to student volunteers at Georgetown School of Medicine, 150+
        locations were added across eleven (11) states.
      </AlertTitle>
      <AlertText>
        Next update will add new sites for 10+ states. You can help by
        <Link href={ADD_LOCATION_FORM} target="_blank" rel="noopener">
          &nbsp;adding a new location
        </Link>
        .
      </AlertText>
    </InfoPrompt>
  </AppBar>
);

Header.defaultProps = {
  showToolbar: false,
};

export default Header;
