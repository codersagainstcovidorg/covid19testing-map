import React from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ADD_LOCATION_FORM } from '../constants';

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

const InfoPrompt = styled(Alert)`
  border-radius: 0 !important;
  position: relative;
  min-height: 63px;
`;

const HeaderText = styled(Typography)`
  font-size: 1.3rem;
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  right: 5px;
  top: 5px;
`;

const AlertText = styled.div``;

// NOTE: Update this date when changing info text, so new versions will appear closed earlier
const LAST_VERSION =
  'Sun Mar 29 2020 18:50:03 GMT-0400 (Eastern Daylight Time)';
const LOCAL_STORAGE_KEY = 'InfoPrompt';

type HeaderProps = {
  showToolbar: boolean;
  toggleDrawer: Function;
};

const Header = ({ showToolbar, toggleDrawer }: HeaderProps) => {
  const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  const hasBeenClosed = savedValue === LAST_VERSION;
  const [closed, setClosed] = React.useState<boolean>(hasBeenClosed);

  const handleClose = () => {
    setClosed(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, LAST_VERSION);
  };

  return (
    <AppBar position="static">
      {showToolbar && (
        <HeaderToolbar variant="dense">
          <IconButton onClick={() => toggleDrawer()}>
            <DrawerIcon />
          </IconButton>

          <HeaderText variant="h5">Find Covid Testing</HeaderText>
        </HeaderToolbar>
      )}

      {!closed && (
        <InfoPrompt variant="filled" severity="info">
          <AlertTitle>
            Thanks to student volunteers at Georgetown School of Medicine, 150+
            locations were added across eleven (11) states.
          </AlertTitle>
          <AlertText>
            Next update will add new sites for 10+ states. You can help by{' '}
            <Link href={ADD_LOCATION_FORM} target="_blank" rel="noopener">
              adding a new location
            </Link>
            .
          </AlertText>

          <CloseButton onClick={handleClose} size="small" color="inherit">
            <CloseRoundedIcon />
          </CloseButton>
        </InfoPrompt>
      )}
    </AppBar>
  );
};

Header.defaultProps = {
  showToolbar: false,
};

export default Header;
