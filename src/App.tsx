import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Sidebar } from './Components/Sidebar';
import { Map } from './Components/Map';
import { Header } from './Components/Header';
import { Card, CardContent, Typography, CardActions, Button, Modal, CardHeader, Link, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import CloseIcon from '@material-ui/icons/Close';

export const labelMap: any = {
  'is-verified': 'Is Verified',
  'is-location-screening-patients': 'Screening Patients',
  'is-location-collecting-specimens': 'Collecting Specimens',
  'is-location-accepting-third-party-orders-for-testing': 'Accepting 3rd party testing',
  'is-location-only-testing-patients-that-meet-criteria': 'Testing criteria required',
  'is-location-by-appointment-only': 'Appointment only'
};

export interface SearchFilters {
  'is-verified': boolean;
  'is-location-screening-patients': boolean;
  'is-location-collecting-specimens': boolean;
  'is-location-accepting-third-party-orders-for-testing': boolean;
  'is-location-only-testing-patients-that-meet-criteria': boolean;
  'is-location-by-appointment-only': boolean;
}

// Initial state
const defaultFilters: SearchFilters = {
  'is-verified': true,
  'is-location-screening-patients': true,
  'is-location-collecting-specimens': false,
  'is-location-accepting-third-party-orders-for-testing': false,
  'is-location-only-testing-patients-that-meet-criteria': false,
  'is-location-by-appointment-only': false
};

interface AppState {
  filters: SearchFilters;
  drawerOpen: boolean;
  currentPlace: any;
}

export const SearchContext = React.createContext<SearchFilters>(defaultFilters);

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      filters: defaultFilters,
      currentPlace: null,
      drawerOpen: false
    };
  }

  render() {
    const location = this.state.currentPlace;

    let items: any = [
      {
        'title': 'Type',
        'key': 'location-place-of-service-type',
        'icon': <InfoIcon />
      },
      {
        'title': 'Website',
        'key': 'location-contact-url-main',
        'icon': <LanguageIcon />
      },
      {
        'title': 'Testing Criteria',
        'key': 'location-specific-testing-criteria',
        'icon': <LanguageIcon />
      }
    ];

    Object.keys(labelMap).forEach(key => {
      items.push({
        'type': 'boolean',
        'title': labelMap[key],
        'key': key,
        'icon': <InfoIcon />
      });
    });


    return (
      <SearchContext.Provider value={this.state.filters}>
        <Grid className="container" container direction="row">
          <Grid container item xs={12} style={{ zIndex: 30, height: 40 }}>
            <Header toggleDrawer={() => this.setState({ drawerOpen: !this.state.drawerOpen })} />
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid container item xs={4} style={{ zIndex: 20 }}>
            <Sidebar drawerOpen={this.state.drawerOpen} toggleFilter={(filterKey: keyof SearchFilters) => {
              this.setState({
                filters: { ...this.state.filters, [filterKey]: !this.state.filters[filterKey] }
              });
            } } />
          </Grid>

          <Grid onClick={() => {
            if (this.state.drawerOpen) {
              this.setState({ drawerOpen: false });
            }
          }} container item xs={12}>
            <Map lockMap={false} onClickPin={(place: any) => {
              this.setState({ currentPlace: place });
            }} />

            {location === null ? '' : (
              <Modal
                style={{ width: '90%', maxWidth: 600, padding: 10, margin: '0 auto', outline: 0 }}
                onClose={() => this.setState({ currentPlace: null })}
                disableAutoFocus={true} open
              >
                <Card style={{ outline: 0 }}>
                  <CardHeader
                    title={location['location-name']}
                    subheader={
                      location['location-address-street'].trim() + ', '
                      + location['location-address-locality'].trim()
                      + ', ' + location['location-address-region'].trim()
                      + ' ' + location['location-address-postal-code'].trim()
                    }
                    action={
                      <IconButton aria-label="close"
                        onClick={() => this.setState({ currentPlace: null })}>
                        <CloseIcon />
                      </IconButton>
                    }
                  />

                  <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                      {location['additional-information-for-patients']}
                    </Typography>

                    <List dense={true} style={{ paddingBottom: 0, marginBottom: 0, fontSize: 12 }}>
                      {items.map((item: any, idx: number) => {
                        if (location[item.key].length === 0) {
                          return '';
                        }

                        let content = location[item.key];
                        if (item.type === 'boolean') {
                          content = content === 'TRUE' ? '✅' : '🔴';
                        }

                        return (
                          <ListItem key={idx}>
                            <ListItemAvatar>
                              <Avatar>
                                {item.icon}
                              </Avatar>
                            </ListItemAvatar>
                            {location[item.key].substr(0, 4) === 'http'
                              ? <ListItemText primary={<Link href={location[item.key]}>{location[item.key]}</Link>} />
                              : <ListItemText primary={item.title} secondary={content} />}
                          </ListItem>
                        )
                      })}
                    </List>
                  </CardContent>

                  {location['location-contact-phone-main'] === '' ? '' : (
                    <CardActions>
                      <Button size="small" href={'tel://' + location['location-contact-phone-main']}>
                        Call Main Line ({location['location-contact-phone-main']})
                      </Button>
                    </CardActions>
                  )}

                  {location['location-contact-phone-appointments'] === '' ? '' : (
                    <CardActions>
                      <Button size="small" href={'tel://' + location['location-contact-phone-appointments']}>
                        Call Appointments Line ({location['location-contact-phone-appointments']})
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Modal>
            )}
          </Grid>
        </Grid>
      </SearchContext.Provider>
    );
  }
}

export default App;
