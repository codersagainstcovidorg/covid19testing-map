import React, { useState } from 'react';
import {
    Drawer, Box, Typography, Tabs, Tab, AppBar,
    FormGroup, FormControlLabel, Switch
} from '@material-ui/core';
import { SearchContext } from '../App';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

type SidebarProps = {
    drawerOpen: boolean;
    toggleFilter: Function
}

export const Sidebar = ({ drawerOpen, toggleFilter }: SidebarProps) => {
    const [tabIdx, setTab] = useState(0);

    return <SearchContext.Consumer>
        {
            ( searchFilters ) => {
                return <Drawer
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                >
                    <div style={{ paddingTop: '48px' }}>
                        <AppBar position="static">
                            <Tabs value={tabIdx} onChange={(e, v) => setTab(v)}>
                                <Tab label="Filters" />
                                {0 ? <Tab label="Place" /> : ''}
                            </Tabs>
                        </AppBar>

                        <TabPanel value={tabIdx} index={0}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch size="small" checked={searchFilters['is-verified']}
                                    onChange={() => toggleFilter('is-verified')} />}
                                    label="Verified"
                                />

                                <FormControlLabel
                                    control={<Switch size="small" checked={searchFilters['is-location-screening-patients']}
                                    onChange={() => toggleFilter('is-location-screening-patients')} />}
                                    label="Screening Patients"
                                />

                                <FormControlLabel
                                    control={<Switch size="small" checked={searchFilters['is-location-only-testing-patients-that-meet-criteria']}
                                    onChange={() => toggleFilter('is-location-only-testing-patients-that-meet-criteria')} />}
                                    label="Must Meet Criteria"
                                />

                                <FormControlLabel
                                    control={<Switch size="small" checked={searchFilters['is-location-by-appointment-only']}
                                    onChange={() => toggleFilter('is-location-by-appointment-only')} />}
                                    label="Appointment Only"
                                />

                                <FormControlLabel
                                    control={<Switch size="small" checked={searchFilters['is-location-collecting-specimens']}
                                    onChange={() => toggleFilter('is-location-collecting-specimens')} />}
                                    label="Collecting Specimens"
                                />
                            </FormGroup>
                        </TabPanel>

                        {0 ? <TabPanel value={tabIdx} index={1}>

                        </TabPanel> : ''}
                    </div>
                </Drawer>
            }
        }
    </SearchContext.Consumer>;
}