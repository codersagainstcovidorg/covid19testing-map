import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { faTasks, faVial } from '@fortawesome/free-solid-svg-icons';
import { indigo } from '@material-ui/core/colors';
import { Sidebar } from './Components/Sidebar';
import Map from './Components/Map';
import LocationModal from './Components/LocationModal';
import Header from './Components/Header';

// Building a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
      light: '#7c42bd',
      dark: '#12005e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ace520',
      light: '#e2ff5e',
      dark: '#77b300',
      contrastText: '#4a148c',
    },
  },
});

export interface LabelMap {
  [key: string]: {
    [key: string]: any;
  };
}

// Map for toggles and modal line items
export const labelMap: LabelMap = {
  is_ordering_tests_only_for_those_who_meeting_criteria: {
    sidebar: 'Tests only those meeting criteria',
    card: 'Testing criteria',
    icon: faTasks,
  },
  is_collecting_samples: {
    sidebar: 'Collects samples for testing',
    card: 'Collects samples',
    icon: faVial,
  },
};

// Controls toggles
export interface SearchFilters {
  is_ordering_tests_only_for_those_who_meeting_criteria: boolean;
  is_collecting_samples: boolean;
}

// Initial state
const defaultFilters: SearchFilters = {
  is_ordering_tests_only_for_those_who_meeting_criteria: true,
  is_collecting_samples: true,
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

const dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer = (window as any).dataLayer || [];

export class App extends React.Component<{}, AppState> {
  static handleLocationPrompt(action: string, response: string): void {
    ReactGA.event({
      category: 'Location Prompt',
      action,
      label: response,
    });
  }

  static handleDrawerStatus(action: boolean): void {
    ReactGA.event({
      category: 'Drawer',
      action: action ? 'Close' : 'Open',
    });
  }

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
      },
    };
  }

  componentDidMount(): void {
    try {
      this.locateUser();
    } catch (e) {
      console.error('failed to locate user', e);
    }
  }

  locateUser() {
    navigator.geolocation.getCurrentPosition(
      (res: GeolocationCoordinates) => {
        dataLayer.push({
          event: 'pageview',
          location: {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          },
        });
        console.log('setting', res.coords);

        this.setState({
          viewState: {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
            zoom: 8,
            bearing: 0,
            pitch: 0,
          },
        });
      },
      (e: any) => {
        console.error('failed to get location from browser', e);
        this.geoIPFallback();
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  }

  geoIPFallback() {
    App.handleLocationPrompt('GeoIP', 'Attempt');

    fetch(
      'https://pro.ip-api.com/json/?fields=status,lat,lon&key=WNyJJH2siHnfQU0'
    )
      .then((r: Response) => r.json())
      .then((data) => {
        if (data.status === 'success') {
          App.handleLocationPrompt('GeoIP', 'Success');

          this.setState({
            viewState: {
              latitude: data.lat,
              longitude: data.lon,
              zoom: 8,
              bearing: 0,
              pitch: 0,
            },
          });
        }
      });
  }

  render() {
    const { currentPlace, filters, drawerOpen, viewState } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={filters}>
          <Grid className="container" container direction="row">
            <Grid container item xs={12} style={{ zIndex: 110 }}>
              <Header
                toggleDrawer={() => {
                  App.handleDrawerStatus(drawerOpen);
                  this.setState({ drawerOpen: !drawerOpen });
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="column">
            <Grid container item xs={4} style={{ zIndex: 100 }}>
              <Sidebar
                drawerOpen={drawerOpen}
                toggleFilter={(filterKey: keyof SearchFilters) => {
                  this.setState({
                    filters: { ...filters, [filterKey]: !filters[filterKey] },
                  });
                }}
              />
            </Grid>

            <Grid
              onClick={() => {
                if (drawerOpen) {
                  this.setState({ drawerOpen: false });
                }
              }}
              container
              item
              xs={12}
            >
              <Map
                lockMap={false}
                viewState={viewState}
                setViewState={(newState: any) => {
                  this.setState({ viewState: newState.viewState });
                }}
                onClickPin={(place: any) => {
                  this.setState({ currentPlace: place });
                }}
              />

              {currentPlace === null ? (
                ''
              ) : (
                <LocationModal
                  location={currentPlace}
                  onClose={() => {
                    this.setState({ currentPlace: null });
                  }}
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
