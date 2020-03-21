import React from "react";
import styled from "styled-components";
import { Toolbar, IconButton, AppBar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";

const InfoPrompt = styled(Alert)`
  border-radius: 0;
  min-height: 35px;
`;

const HeaderToolbar = styled(Toolbar)`
  padding: 0 7px;
  font-family: "Roboto,Helvetica,Arial,sans-serif";
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

type HeaderProps = {
  toggleDrawer: Function;
};

export const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <AppBar position="static">
      <HeaderToolbar variant="dense">
        <IconButton onClick={() => toggleDrawer()}>
          <DrawerIcon />
        </IconButton>

        <HeaderText variant="h5">COVID-19 Evaluation and Testing</HeaderText>
      </HeaderToolbar>

      <InfoPrompt variant="filled" severity="info">
        7173 New Locations added in last 24 hours. Check back for regular
        updates.
      </InfoPrompt>
    </AppBar>
  );
};
