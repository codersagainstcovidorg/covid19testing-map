import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  faTasks,
  faVial,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from '@material-ui/core/styles';
import Joyride, { EVENTS, STATUS, Step } from 'react-joyride';
import AppBar from './Components/AppBar/AppBar';
import LocationModal from './Components/LocationModal/LocationModal';
// import Header from './Components/Header';
import LegalModal from './Components/LegalModal';
import theme from './theme';
import getViewportHeight from './utils/getViewportHeight';
import {
  trackGuideStatus,
  trackLocationPrompt,
  trackUserLocation,
} from './utils/tracking';
import GuideModal from './Components/GuideModal';
import SearchCard from './Components/SearchCard';
import Map from './Components/Map/Map';

// Layout Component styles
const LayoutContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
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
  const [selectedPlace, setCurrentPlace] = useState(null);
  const [gatewayAnswered, setGatewayAnswered] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [globalMap, setGlobalMap] = useState(null);
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
          // TODO: Update this setViewState to set the view of the Google Map
          //
          // setViewState({
          //   latitude: lat,
          //   longitude: lon,
          //   zoom: 8,
          //   bearing: 0,
          //   pitch: 0,
          // });
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

        // TODO: Update this setViewState to set the view of the Google Map
        //
        // setViewState({
        //   latitude: lat,
        //   longitude: lon,
        //   zoom: 8,
        //   bearing: 0,
        //   pitch: 0,
        // });
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
  function toggleGuide() {
    setGuideModalOpen((prevState) => !prevState);
    trackGuideStatus(guideModalOpen);
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
      target: '#search-input',
      content: <SearchCard />,
      placement: 'right-end',
      disableBeacon: true,
    },
  ];

  function handleJoyrideCallback(data: any) {
    const { status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setGatewayAnswered(false);
    }
    console.groupCollapsed(type);
    console.groupEnd();
  }

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
            callback={handleJoyrideCallback}
            steps={steps}
            styles={{
              options: {
                zIndex: 1000,
              },
            }}
            run={gatewayAnswered}
          />

          <LegalModal />

          <MapContainer>
            <Map
              onClickPin={(place: any) => {
                setCurrentPlace(place);
              }}
              setMap={setGlobalMap}
            />
          </MapContainer>
          {selectedPlace !== null && (
            <LocationModal
              location={selectedPlace}
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
              toggleDrawer={toggleGuide}
              map={globalMap}
            />
          </AppBarContainer>
        </LayoutContainer>
      </SearchContext.Provider>
    </ThemeProvider>
  );
};

export default App;
