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

// Map for toggles and modal line items
export const labelMap: LabelMap = {
  'is_ordering_tests_only_for_those_who_meeting_criteria': {
    sidebar: 'Tests only those meeting criteria',
    card: 'Tests only those meeting criteria'
  },
  'is_collecting_samples': {
    sidebar: 'Collects samples for testing',
    card: 'Collects samples for testing'
  },
};

// Controls toggles
export interface SearchFilters {
  'is_ordering_tests_only_for_those_who_meeting_criteria': boolean;
  'is_collecting_samples': boolean;
}

// Initial state
const defaultFilters: SearchFilters = {
  'is_ordering_tests_only_for_those_who_meeting_criteria': true,
  'is_collecting_samples': true
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
        longitude: -122.1419,
        latitude: 37.4419,
        zoom: 2.5,
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

    fetch('https://pro.ip-api.com/json/?fields=status,lat,lon&key=WNyJJH2siHnfQU0').then((r: Response) => {
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
            <Grid container item xs={12} style={{ zIndex: 110 }}>
          <Header toggleDrawer={() => {
            this.handleDrawerStatus(this.state.drawerOpen);
            this.setState({ drawerOpen: !this.state.drawerOpen })

              }} />
            </Grid>
          </Grid>

          <Grid container direction="column">
            <Grid container item xs={4} style={{ zIndex: 100 }}>
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
