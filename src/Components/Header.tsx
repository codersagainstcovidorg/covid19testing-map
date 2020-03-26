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

const InfoPrompt = styled(Alert)`
  border-radius: 0;
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
  toggleDrawer: Function;
};

const Header = ({ toggleDrawer }: HeaderProps) => (
  <AppBar position="static">
    <HeaderToolbar variant="dense">
      <IconButton onClick={() => toggleDrawer()}>
        <DrawerIcon />
      </IconButton>

      <HeaderText variant="h5">Find Covid Testing</HeaderText>
    </HeaderToolbar>

    <InfoPrompt variant="filled" severity="info">
      <AlertTitle>
        Data updated: Mar 26, 2020 1:42AM PDT. Added to NJ, NY, and TX. States
        with data in queue: NJ, NY, TX, MD, WI, MN, MI, AZ, CA, OH, PA, CT.
      </AlertTitle>
      <AlertText>
        {'You can help by '}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSe2sCuCrQwEHwi3FLiyRB9CYWRmSUiGyyK8RLsQPwhfrJTI4g/viewform"
          target="_blank"
          rel="noopener"
        >
          adding a new location
        </Link>
        .
      </AlertText>
    </InfoPrompt>
  </AppBar>
);

export default Header;
