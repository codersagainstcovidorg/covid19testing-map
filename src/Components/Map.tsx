import React, { useContext } from "react";
import styled from "styled-components";
import { IconLayer } from '@deck.gl/layers'
import { DeckGL } from "@deck.gl/react";
import { StaticMap, GeolocateControl, NavigationControl } from "react-map-gl";

import { SearchContext } from "../App";
import { MAPBOX_TOKEN } from "../constants";
import { getFilteredPins } from "../utils/getFilteredPins";

// single value for now but should change exponentially
const getDelta = (zoom: number): number => 0.05 / zoom;

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

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 31, height: 40}
};

export const Map = (props: MapProps) => {
  const { onClickPin, lockMap, viewState, setViewState } = props;
  const searchFilters = useContext(SearchContext);
  const filteredPins = getFilteredPins(searchFilters);

  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data: filteredPins,
    pickable: true,
    iconAtlas: '/LocationIcon.svg',
    iconMapping: ICON_MAPPING,
    getIcon: d => 'marker',
    sizeScale: 10,
    getPosition: (d: any)  => [d.lng, d.lat, 30],
    getSize: (d: any) => 5,
    getColor: (d: any) => [Math.sqrt(d.exits), 140, 0],
    onHover: (d: any) => {
        // re-implementing cursor hover behavior
        // iconLayer does not have a mouseout event
        document.body.style.cursor = "pointer";
        let movedX = 0;
        let movedY = 0;
        let prevX = 0;
        let prevY = 0;
        // if within square region of hover
        const handler = (e: any) => {
            if (!prevX) { prevX = e.clientX; }
            if (!prevY) { prevY = e.clientY; }
            movedX += Math.abs(e.clientX - prevX);
            movedY += Math.abs(e.clientY - prevY);
            prevX = e.clientX;
            prevY = e.clientY;
            if (movedX > 10 || movedY > 15) {
                document.body.style.cursor = "default";
                document.removeEventListener('mousemove', handler);
            }
        }
        document.addEventListener('mousemove', handler);
    },
    onClick: ({object}) => onClickPin(object) 
  });

  return (
    <DeckGL
      viewState={viewState}
      width="100vw"
      height="100vh"
      controller={!lockMap}
      getCursor={() => "cursor"}
      onViewStateChange={setViewState}
      layers={[iconLayer]}
      // @ts-ignore
      glOptions={{ onError: console.error }}
    >
      <StaticMap
        width="100vw"
        height="100vh"
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
      </StaticMap>
    </DeckGL>
  );
};
