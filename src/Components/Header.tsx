import React from 'react';
import { Toolbar, IconButton, AppBar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MenuIcon from '@material-ui/icons/Menu';

type HeaderProps = {
    toggleDrawer: Function
};

export const Header = ({ toggleDrawer }: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense" style={{padding: '0 7', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontWeight: "bold"}}>
                {1 ?
                <IconButton onClick={() => toggleDrawer()}>
                    <MenuIcon style={{color: 'white', marginLeft: '-20'}} />
                </IconButton> : ''}

                <Typography variant="h5" style={{fontSize: '1.3rem'}}>
                    COVID-19 Evaluation and Testing
                </Typography>
            </Toolbar>
            <Alert style={{borderRadius: '0px'}} variant="filled" severity="info">
                7173 New Locations added in last 24 hours. Check back for regular updates.
            </Alert>
        </AppBar>
    );
}