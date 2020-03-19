import React, { useState } from 'react';
import {
    Drawer, Box, Typography, Tabs, Tab, AppBar,
    FormGroup, FormControlLabel, Switch, Divider
} from '@material-ui/core';
import { VerticalLinearStepper } from './StepperVertical';
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
                    <div style={{ paddingTop: '32px', minWidth: '25%', maxWidth: '450px' }}>
                        {/* <AppBar position="static">
                            <Tabs value={tabIdx} onChange={(e, v) => setTab(v)}>
                                <Tab label="Filters" />
                                {0 ? <Tab label="Place" /> : ''}
                            </Tabs>
                        </AppBar> */}

                        {/* <TabPanel value={tabIdx} index={0}> */}
                            <Typography style={{padding: '12%', fontWeight: 'bold', fontSize: '1.3rem', color: '#E45B26', textAlign: 'center'}}>
                                If this is a medical emergency, stop and dial 911. 
                            </Typography>
                            {/* <Typography style={{padding: '15%', fontWeight: 'bold', fontSize: '1.8rem', color: '#E45B26', alignContent: 'center'}}>
                                If you are experiencing fever, chills, cough, headache or another flu-like symptom CALL BEFORE you head to any healthcare facility.
                            </Typography> */}
                            
                            <Divider style={{margin: 10}} />
                            
                            <FormGroup style={{paddingLeft: '15%', paddingRight: '10%',  paddingTop: '16px', paddingBottom: '16px',}}>

                                {Object.keys(searchFilters).map((filter : string, idx: number) => {
                                    return (<FormControlLabel
                                        key={`toggle-${idx}`}
                                        control={<Switch size="small" checked={searchFilters[filter as keyof SearchFilters]}
                                        onChange={() => toggleFilter(filter)} />}
                                        label={labelMap[filter]}
                                        labelPlacement="start"
                                    />);
                                })}

                            </FormGroup>

                            <Divider style={{margin: 10}} />
                            
                            <VerticalLinearStepper />

                        {/* </TabPanel> */}

                        {/* {0 ? <TabPanel value={tabIdx} index={1}>

                        </TabPanel> : ''} */}
                    </div>
                </Drawer>
            }
        }
    </SearchContext.Consumer>;
}