import styled from "styled-components";
import React, { useContext, useMemo } from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

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

const mapRef = React.createRef<ReactMapGL>();

export const Map = (props: MapProps) => {
  const { viewState, setViewState, onClickPin } = props;
  const searchFilters = useContext(SearchContext);
  const filteredPins = useMemo(() => getFilteredPins(searchFilters), [searchFilters]);

  return (
    <div>
      <ReactMapGL
        width={"100vw"}
        height={"calc(100vh - 124px)"}
        viewState={viewState}
        getCursor={() => "cursor"}
        onViewStateChange={setViewState}
        ref={mapRef}
        style={{ zIndex: 50, position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v11?optimize=true"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Navigation>
          <Geocoder
            onViewportChange={(data: any) => {
              const { longitude, latitude, zoom } = data;
              setViewState({
                viewState: {
                  ...viewState,
                  longitude,
                  latitude,
                  zoom
                }
              });
            }}
            position="top-left"
            countries="US"
            mapRef={mapRef}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
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
        <Pins data={filteredPins} onClick={onClickPin} mapRef={mapRef} />
      </ReactMapGL>
    </div>
  );
};
