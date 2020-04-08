import React from 'react';
import styled from 'styled-components';
import {
  faTasks,
  faVial,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@material-ui/core/styles';
import Joyride from 'react-joyride';
import AppBar from './Components/AppBar';
import Sidebar from './Components/Sidebar';
import Map from './Components/Map';
import LocationModal from './Components/LocationModal';
// import Header from './Components/Header';
import LegalModal from './Components/LegalModal';
import theme from './theme';
import getViewportHeight from './utils/getViewportHeight';
import {
  trackDrawerStatus,
  trackLocationPrompt,
  trackUserLocation,
} from './utils/tracking';
import GuideModal from './Components/GuideModal';
import SearchStep from './Components/SearchStep';

// Layout Component styles
const LayoutContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

/*
const HeaderContainer = styled.div`
  z-index: 100;
  position: relative;
`;
*/

const SidebarContainer = styled.div`
  z-index: 110;
  position: relative;
`;

const MapContainer = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  position: relative;
`;

const AppBarContainer = styled.div`
  z-index: 120;
  position: relative;
`;

export interface LabelMap {
  [key: string]: {
    sidebar: string;
    card: string;
    icon: IconDefinition;
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
  is_ordering_tests_only_for_those_who_meeting_criteria: false,
  is_collecting_samples: true,
};

interface AppState {
  filters: SearchFilters;
  drawerOpen: boolean;
  currentPlace: any;
  guideAnswered: boolean;
  searchEmpty: boolean;
  viewState: any;
  steps: any;
  viewportHeight: number;
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
const geocoderContainerRef = React.createRef<any>();

let windowListener: any; // store event handler for resize events

const dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer = (window as any).dataLayer || [];

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewportHeight: 0,
      filters: defaultFilters,
      currentPlace: null,
      guideAnswered: false,
      searchEmpty: true,
      drawerOpen: false,
      viewState: {
        longitude: -122.1419,
        latitude: 37.4419,
        zoom: 2.5,
        bearing: 0,
        pitch: 0,
      },
      steps: [
        {
          target: '.search-container',
          content: <SearchStep />,
          placement: 'right-end',
          disableBeacon: true,
        },
      ],
    };
  }

  componentDidMount(): void {
    try {
      this.locateUser();
    } catch (e) {
      console.error('failed to locate user', e);
    }

    geocoderContainerRef.current.focus();
    // detect resize events and set viewport height
    windowListener = window.addEventListener('resize', () => this.setHeight());
    this.setHeight();
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', windowListener);
  }

  // set height using js, as 100vh doesn't work as expected in mobile safari
  setHeight(): void {
    const viewportHeight = getViewportHeight();
    this.setState({ viewportHeight });
  }

  locateUser() {
    navigator.geolocation.getCurrentPosition(
      (res: GeolocationCoordinates) => {
        const { latitude, longitude } = res.coords;
        trackUserLocation(latitude, longitude);

        dataLayer.push({
          event: 'pageview',
          location: {
            latitude,
            longitude,
          },
        });

        this.setState({
          viewState: {
            latitude,
            longitude,
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
    trackLocationPrompt('Attempt');

    fetch(
      'https://pro.ip-api.com/json/?fields=status,lat,lon&key=WNyJJH2siHnfQU0'
    )
      .then((r: Response) => r.json())
      .then((data) => {
        if (data.status === 'success') {
          const { lat, lon } = data;
          trackLocationPrompt('Success');

          trackUserLocation(lat, lon);
          dataLayer.push({
            event: 'pageview',
            location: {
              latitude: lat,
              longitude: lon,
            },
          });

          this.setState({
            viewState: {
              latitude: lat,
              longitude: lon,
              zoom: 8,
              bearing: 0,
              pitch: 0,
            },
          });
        }
      });
  }

  render() {
    const {
      currentPlace,
      filters,
      drawerOpen,
      viewState,
      viewportHeight,
      guideAnswered,
      searchEmpty,
      steps,
    } = this.state;
    const toggleDrawer = () => {
      this.setState({ drawerOpen: !drawerOpen });
      trackDrawerStatus(drawerOpen);
    };

    return (
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={filters}>
          <LayoutContainer style={{ height: viewportHeight }}>
            <GuideModal
              onClose={() => {
                this.setState({ guideAnswered: true });
              }}
            />
            <Joyride
              steps={steps}
              styles={{
                options: {
                  zIndex: 1000,
                },
              }}
              run={guideAnswered && searchEmpty}
              spotlightClicks
              disableOverlayClose
            />

            <LegalModal />
            {/* Not being used at the moment */}
            {/* <HeaderContainer>
              <Header toggleDrawer={toggleDrawer} />
            </HeaderContainer> */}
            <SidebarContainer>
              <Sidebar
                drawerOpen={drawerOpen}
                toggleFilter={(filterKey: keyof SearchFilters) => {
                  this.setState({
                    filters: { ...filters, [filterKey]: !filters[filterKey] },
                  });
                }}
              />
            </SidebarContainer>

            <MapContainer
              onClick={() => {
                if (drawerOpen) {
                  this.setState({ drawerOpen: false });
                }
              }}
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
                didSearch={this.setState({ searchEmpty: false })}
                geocoderContainerRef={geocoderContainerRef}
              />
            </MapContainer>
            {currentPlace !== null && (
              <LocationModal
                location={currentPlace}
                onClose={() => {
                  this.setState({ currentPlace: null });
                }}
              />
            )}

            <AppBarContainer>
              <AppBar
                geocoderContainerRef={geocoderContainerRef}
                toggleDrawer={toggleDrawer}
              />
            </AppBarContainer>
          </LayoutContainer>
        </SearchContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
