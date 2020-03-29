import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AssistantIcon from '@material-ui/icons/Assistant';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

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
  })
);

const AppBar = () => {
  const classes = useStyles();

  return (
    <MuiAppBar position="relative" color="default" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="search">
          <SearchIcon />
        </IconButton>
        <Fab
          color="primary"
          aria-label="guide"
          size="medium"
          className={classes.fabButton}
        >
          <AssistantIcon />
        </Fab>
        <div className={classes.grow} />
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
        <IconButton edge="end" color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
