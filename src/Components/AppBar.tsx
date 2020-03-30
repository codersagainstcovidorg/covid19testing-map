import React from 'react';
import styled from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import MoreButton from './MoreButton';
import { ADD_LOCATION_FORM } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      height: '60px',
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    searchContainer: {
      position: 'relative',
    },
  })
);

type AppBarProps = {
  geocoderContainerRef: any;
  toggleDrawer: () => void;
};

const AppBar = (props: AppBarProps) => {
  const classes = useStyles();

  const { geocoderContainerRef, toggleDrawer } = props;

  return (
    <MuiAppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.searchContainer} ref={geocoderContainerRef} />

        <Fab
          onClick={toggleDrawer}
          className={classes.fabButton}
          color="primary"
        >
          <AssistantIcon />
        </Fab>

        <div className={classes.grow} />

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
