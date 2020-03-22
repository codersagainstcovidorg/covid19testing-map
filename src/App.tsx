import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Sidebar } from './Components/Sidebar';
import { Map } from './Components/Map';
import { Header } from './Components/Header';
import { LocationModal } from './Components/LocationModal';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ReactGA from "react-ga";

// Building a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a138c',
      light: '#7c42bd',
      dark: '#12005e',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ace520',
      light: '#e2ff5e',
      dark: '#77b300',
      contrastText: '#4a148c'
    },
  },
});

export interface LabelMap {
  [key: string]: {
    [key: string]: string
  }
}

export const labelMap: LabelMap = {
  'is-verified': {
      sidebar: 'Exclude local public health agencies',
      card: 'Is a local public health agency'
  },
  'is-location-screening-patients': {
    sidebar: 'Checks patients for symptoms',
    card: 'Checks patients for symptoms'
  },
  'is-location-collecting-specimens': {
    sidebar: 'Offers COVID-19 testing',
    card: 'Offers COVID-19 testing'
  },
  'is-location-accepting-third-party-orders-for-testing': {
    sidebar: 'Accepting 3rd party testing',
    card: 'Accepting 3rd party testing'
  },
  'is-location-only-testing-patients-that-meet-criteria': {
    sidebar: 'Patients must meet testing criteria',
    card: 'Patients must meet testing criteria'
  },
  'is-location-by-appointment-only': {
    sidebar: 'Requires appointment',
    card: 'Requires appointment'
  }
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
  viewState: any;
}

interface GeolocationCoordinates {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

export const SearchContext = React.createContext<SearchFilters>(defaultFilters);

let dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      filters: defaultFilters,
      currentPlace: null,
      drawerOpen: false,
      viewState: {
        longitude: -98,
        latitude: 38.5,
        zoom: 5,
        bearing: 0,
        pitch: 0,
      }
    };

  }

  componentWillMount() {
    try {
      this.locateUser();
    } catch(e) {
      console.error('failed to locate user', e);
    }
  }

  locateUser() {

    navigator.geolocation.getCurrentPosition((res: GeolocationCoordinates) => {
      dataLayer.push({
        event: 'pageview',
        location: {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        }
      });
      console.log('setting', res.coords);

      this.setState({
        viewState: {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
          zoom: 8,
          bearing: 0,
          pitch: 0,
        }
      })
    }, (e: any) => {
      console.error('failed to get location from browser', e);
      this.geoIPFallback();
    }, {
        enableHighAccuracy: true,
        timeout: 2000
      });
  }

  geoIPFallback() {
    this.handleLocationPrompt('GeoIP', 'Attempt');

    fetch('http://ip-api.com/json/?fields=status,lat,lon').then((r: Response) => {
      return r.json();
    }).then(data => {
      if (data.status === 'success') {
        this.handleLocationPrompt('GeoIP', 'Success');

        this.setState({
          viewState: {
            latitude: data.lat,
            longitude: data.lon,
            zoom: 8,
            bearing: 0,
            pitch: 0
          }
        })
      }
    });
  }

  handleLocationPrompt(action: string, response: string): void {
    ReactGA.event({
      category: 'Location Prompt',
      action: action,
      label: response,
    });
  }

  handleDrawerStatus(action: boolean): void {
    ReactGA.event({
      category: 'Drawer',
      action: action ? 'Close' : 'Open',
    });
  }


  render() {
    const location = this.state.currentPlace;

    return (
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={this.state.filters}>
          
          <Grid className="container" container direction="row">
            <Grid container item xs={12} style={{ zIndex: 30, height: 40 }}>
              <Header toggleDrawer={() => {
                this.handleDrawerStatus(this.state.drawerOpen);
                this.setState({ drawerOpen: !this.state.drawerOpen })

              }} />
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
              <Map
                lockMap={false}
                viewState={this.state.viewState}
                setViewState={(newState: any) => {
                  this.setState({ viewState: newState.viewState })
                }}
                onClickPin={(place: any) => {
                  this.setState({ currentPlace: place });
                }} />

              {location === null ? '' : (
                  <LocationModal
                    location={location}
                    onClose={() => { this.setState({ currentPlace: null }) }}
                  />
              )}
            </Grid>
          </Grid>
        </SearchContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
