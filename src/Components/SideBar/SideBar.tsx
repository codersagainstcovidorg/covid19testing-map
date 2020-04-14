import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import SidebarPropType from '../Types/SidebarPropType';

import VerticalLinearStepper from './StepperVertical';

const DrawerContent = styled.div`
  padding-bottom: 75px;
  min-width: 25%;
  max-width: 450px;
`;

const Heading = styled.h3`
  color: black;
  text-align: center;
  padding-top: 10px;
`;

const Warning = styled(Typography)`
  padding: 12%;
  font-weight: bold !important;
  font-size: 1.3rem !important;
  color: #e45b26;
  text-align: center;
`;

const SectionDivider = styled(Divider)`
  margin: 10px 24px !important;
`;

const SideBar = ({ drawerOpen }: SidebarPropType) => (
  <Drawer variant="persistent" anchor="left" open={drawerOpen}>
    <DrawerContent>
      <Heading>Before you get started</Heading>
      <Warning>If this is a medical emergency, stop and dial 911.</Warning>

      <SectionDivider />

      <VerticalLinearStepper />
    </DrawerContent>
  </Drawer>
);

export default SideBar;
