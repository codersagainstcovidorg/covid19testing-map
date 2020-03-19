import React, { useState } from 'react';
import {
    Drawer, Box, Typography, Tabs, Tab, AppBar,
    FormGroup, FormControlLabel, Switch, Divider
} from '@material-ui/core';
import { SearchContext, SearchFilters, labelMap } from '../App';

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

                                {Object.keys(searchFilters).map((filter : string, idx: number) => {
                                    return (<FormControlLabel
                                        control={<Switch size="small" checked={searchFilters[filter as keyof SearchFilters]}
                                        onChange={() => toggleFilter(filter)} />}
                                        label={labelMap[filter]}
                                    />);
                                })}

                            </FormGroup>


                            <Divider style={{margin: 10}} />
                            <Typography style={{padding: 10, width: 260}}>
                                If this is a medical emergency stop and call 911. If you are experiencing fever, chills, cough, headache or another flu-like symptom CALL BEFORE you head to any healthcare facility.
                            </Typography>

                        </TabPanel>

                        {0 ? <TabPanel value={tabIdx} index={1}>

                        </TabPanel> : ''}
                    </div>
                </Drawer>
            }
        }
    </SearchContext.Consumer>;
}