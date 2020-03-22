import React from 'react';
import {
    Drawer, Typography, FormGroup, FormControlLabel, Switch, Divider
} from '@material-ui/core';

import { VerticalLinearStepper } from './StepperVertical';
import { SearchContext, SearchFilters, labelMap } from '../App';

type SidebarProps = {
    drawerOpen: boolean;
    toggleFilter: Function
}

export const Sidebar = ({ drawerOpen, toggleFilter }: SidebarProps) => {
    return <SearchContext.Consumer>
        {
            ( searchFilters ) => {
                return <Drawer
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                >
                    <div style={{ paddingTop: '85px', minWidth: '25%', maxWidth: '450px' }}>
                    <h3 style={{color: 'black', textAlign: 'center', paddingTop: '10px'}}>Before you get started</h3>
                            <Typography style={{padding: '12%', fontWeight: 'bold', fontSize: '1.3rem', color: '#E45B26', textAlign: 'center'}}>
                                If this is a medical emergency, stop and dial 911. 
                            </Typography>

                            <Divider style={{margin: 10}} />
                            
                            <FormGroup style={{paddingLeft: '15%', paddingRight: '10%',  paddingTop: '16px', paddingBottom: '16px',}}>
                                {Object.keys(searchFilters).map((filter : string, idx: number) => {
                                    return (<FormControlLabel
                                        key={`toggle-${idx}`}
                                        control={<Switch size="small" checked={searchFilters[filter as keyof SearchFilters]}
                                        onChange={() => toggleFilter(filter)} />}
                                        label={labelMap[filter].sidebar}
                                        labelPlacement="start"
                                    />);
                                })}
                            </FormGroup>

                            <Divider style={{margin: 10}} />

                            <VerticalLinearStepper />
                    </div>
                </Drawer>
            }
        }
    </SearchContext.Consumer>;
}