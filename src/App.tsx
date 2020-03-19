import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Sidebar } from './Components/Sidebar';
import { Map } from './Components/Map';
import { Header } from './Components/Header';
import { Card, CardContent, Typography, CardActions, Button, Modal, CardHeader, Link, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import CloseIcon from '@material-ui/icons/Close';

// Building a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'UIColor(red: 1.00, green: 1.00, blue: 0.45, alpha: 1.0)',
      main: 'UIColor(red: 1.00, green: 0.92, blue: 0.23, alpha: 1.0)',
      dark: 'UIColor(red: 0.78, green: 0.73, blue: 0.00, alpha: 1.0)',
      contrastText: 'UIColor(red: 0.29, green: 0.07, blue: 0.55, alpha: 1.0)'
    },
    secondary: {
      light: 'UIColor(red: 0.89, green: 1.00, blue: 0.37, alpha: 1.0)',
      main: 'UIColor(red: 0.67, green: 0.90, blue: 0.13, alpha: 1.0)',
      dark: 'UIColor(red: 0.47, green: 0.70, blue: 0.00, alpha: 1.0)',
      contrastText: 'UIColor(red: 0.29, green: 0.08, blue: 0.55, alpha: 1.0)'
    },
  },
});

export const
 labelMap: any = {
  'is-verified': 'Exclude local public health agencies',
  'is-location-screening-patients': 'Checks patients for symptoms',
  'is-location-collecting-specimens': 'Offers COVID-19 testing',
  'is-location-accepting-third-party-orders-for-testing': 'Accepting 3rd party testing',
  'is-location-only-testing-patients-that-meet-criteria': 'Patients must meet testing criteria',
  'is-location-by-appointment-only': 'Requires appointment'
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

    let details: any = [];
    Object.keys(labelMap).forEach(key => {
      details.push({
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
                  style={{ width: '90%', height: '95%', overflow: 'auto', maxWidth: 600, padding: 10, margin: '0 auto', outline: 0 }}
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

                          return (
                            <ListItem key={idx}>
                              <ListItemAvatar>
                                <Avatar>
                                  {item.icon}
                                </Avatar>
                              </ListItemAvatar>
                              {location[item.key].substr(0, 4) === 'http'
                                ? <ListItemText style={{wordWrap: 'break-word', textOverflow: 'ellipsis'}} 
                                  primary={<Link href={location[item.key]}>{location[item.key]}</Link>} />
                                : <ListItemText primary={item.title} secondary={location[item.key]} />}
                            </ListItem>
                          )
                        })}
                      </List>

                      <Divider style={{margin: 10}} />

                      <Typography variant="h6">Details about this location</Typography>
                      <List>
                      {details.map((item: any, idx: number) => {
                          const content = location[item.key] === 'TRUE' ? '✅' : '🔴';
                          return (
                            <ListItem key={idx}>
                              <ListItemText primary={content + ' ' + item.title} />
                            </ListItem>
                          )
                        })}
                      </List>

                    </CardContent>

                    {location['location-contact-phone-main'] === '' ? '' : (
                      <CardActions>
                        <Button size="small">
                          <Link href={'tel://' + location['location-contact-phone-main']}>
                            Call Main Line ({location['location-contact-phone-main']})
                          </Link>
                        </Button>
                      </CardActions>
                    )}

                    {location['location-contact-phone-appointments'] === '' ? '' : (
                      <CardActions>
                        <Button size="small" >
                          <Link href={'tel://' + location['location-contact-phone-appointments']}>
                            Call Appointments Line ({location['location-contact-phone-appointments']})
                          </Link>
                        </Button>
                      </CardActions>
                    )}

                    <Divider style={{margin: 10}} />

                    <Typography paragraph={true} style={{padding: 10}}>
                    At this point in time, appointments for COVID-19 screening and testing are required at virtually every location - make sure to call or book ahead
                    </Typography>

                    <CardActions>
                      <Button size="small">
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfYpEDiV8MwkBSVa7rKI_OzrmtGvclzgFzvcjxocLJncJOXDQ/viewform?usp=sf_link">
                          Report An Error
                        </Link>
                      </Button>

                      <Button size="small">
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScK-lqYZAr6MdeN1aafCrcXKR0cc96Ym-mzwz-4h3OgTpAvyQ/viewform?usp=sf_link">
                          Suggest An Edit
                        </Link>
                      </Button>
                    </CardActions>
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
