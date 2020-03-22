import React, { useContext } from "react";
import styled from "styled-components";
import { DeckGL } from "@deck.gl/react";
import { StaticMap, GeolocateControl, NavigationControl } from "react-map-gl";

import Pins from "./Pins";
import { SearchContext } from "../App";
import { MAPBOX_TOKEN } from "../constants";
import { getFilteredPins } from "../utils/getFilteredPins";

type MapProps = {
  onClickPin: Function;
  lockMap: boolean;
  viewState: any;
  setViewState: (viewState: any) => any;
};

const Geolocation = styled.div``;

const Zoom = styled.div`
  margin-bottom: 10px;
`;

const Navigation = styled.div`
  bottom: 40px;
  right: 10px;
  position: fixed;
  z-index: 1;
`;

export const Map = (props: MapProps) => {
  const { onClickPin, lockMap, viewState, setViewState } = props;
  const searchFilters = useContext(SearchContext);
  const filteredPins = getFilteredPins(searchFilters);

  return (
    <DeckGL
      viewState={viewState}
      width="100vw"
      height="100vh"
      controller={!lockMap}
      getCursor={() => "cursor"}
      onViewStateChange={setViewState}
      // @ts-ignore
      glOptions={{ onError: console.error }}
    >
      <StaticMap
        width="100vw"
        height="100vh"
        style={{ zIndex: 50 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Navigation>
          <Zoom>
            <NavigationControl
              showCompass={false}
              captureClick
              captureDoubleClick
              onViewportChange={(data: any) => {
                const { zoom } = data;
                setViewState({
                  viewState: { ...viewState, zoom }
                });
              }}
            />
          </Zoom>
          <Geolocation>
            <GeolocateControl
              label="Use my location"
              positionOptions={{ enableHighAccuracy: true }}
              onGeolocate={(data: any) => {
                const { latitude, longitude } = data.coords;
                setViewState({
                  viewState: { ...viewState, latitude, longitude }
                });
              }}
            />
          </Geolocation>
        </Navigation>
        <Pins data={filteredPins} onClick={onClickPin} onHover={() => {}} />;
      </StaticMap>
    </DeckGL>
  );
};
