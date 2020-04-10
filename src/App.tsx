import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  faTasks,
  faVial,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@material-ui/core/styles';
import Joyride, { Step } from 'react-joyride';
import AppBar from './Components/AppBar/AppBar';
import Map from './Components/Map/Map';
import LocationModal from './Components/LocationModal/LocationModal';
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
import SearchCard from './Components/SearchCard';

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
  is_collecting_samples: false,
};

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

const App = () => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [gatewayAnswered, setGatewayAnswered] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: -122.1419,
    latitude: 37.4419,
    zoom: 2.5,
    bearing: 0,
    pitch: 0,
  });
  const [filters, setFilters] = useState(defaultFilters);

  function geoIPFallback() {
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

          setViewState({
            latitude: lat,
            longitude: lon,
            zoom: 8,
            bearing: 0,
            pitch: 0,
          });
        }
      });
  }

  function locateUser() {
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

        setViewState({
          latitude,
          longitude,
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });
      },
      (e: any) => {
        console.error('failed to get location from browser', e);
        geoIPFallback();
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  }
  function toggleDrawer() {
    setGuideModalOpen((prevState) => !prevState);
    trackDrawerStatus(guideModalOpen);
  }

  useEffect(() => {
    try {
      locateUser();
    } catch (e) {
      console.error('failed to locate user', e);
    }
    windowListener = window.addEventListener('resize', () =>
      setViewportHeight(getViewportHeight())
    );
    setViewportHeight(getViewportHeight());
    return function cleanup() {
      window.removeEventListener('resize', windowListener);
    };
  }, []);

  const steps: Step[] = [
    {
      target: '.search-container',
      content: <SearchCard />,
      placement: 'right-end',
      disableBeacon: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <SearchContext.Provider value={filters}>
        <LayoutContainer style={{ height: viewportHeight }}>
          <GuideModal
            modalShouldOpen={guideModalOpen}
            handleYesResponse={() => {
              setGuideModalOpen(false);
              setGatewayAnswered(true);
            }}
            handleNoResponse={() => {
              setGuideModalOpen(false);
            }}
          />
          <Joyride
            steps={steps}
            styles={{
              options: {
                zIndex: 1000,
              },
            }}
            run={gatewayAnswered}
          />

          <LegalModal />
          {/* Not being used at the moment */}
          {/* <HeaderContainer>
              <Header toggleDrawer={toggleDrawer} />
            </HeaderContainer> */}
          {/* <SidebarContainer> */}
          {/*  <SideBar */}
          {/*    guideModalOpen={guideModalOpen} */}
          {/*    toggleFilter={(filterKey: keyof SearchFilters) => { */}
          {/*      this.setState({ */}
          {/*        filters: { ...filters, [filterKey]: !filters[filterKey] }, */}
          {/*      }); */}
          {/*    }} */}
          {/*  /> */}
          {/* </SidebarContainer> */}

          <MapContainer
            onClick={() => {
              if (guideModalOpen) {
                setGuideModalOpen(false);
              }
            }}
          >
            <Map
              lockMap={false}
              viewState={viewState}
              setViewState={(newState: any) => {
                setViewState(newState.viewState);
              }}
              onClickPin={(place: any) => {
                setCurrentPlace(place);
              }}
              geocoderContainerRef={geocoderContainerRef}
            />
          </MapContainer>
          {currentPlace !== null && (
            <LocationModal
              location={currentPlace}
              onClose={() => {
                setCurrentPlace(null);
              }}
              toggleFilter={(filterKey: keyof SearchFilters) => {
                setFilters((prevState) => {
                  console.log(`Previous ${prevState.is_collecting_samples}`);
                  return { ...prevState, [filterKey]: !filters[filterKey] };
                });
                // console.log(`Filters: ${filters}`);
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
};

export default App;
