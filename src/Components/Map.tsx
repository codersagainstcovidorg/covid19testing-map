import React, { useContext } from "react";
import styled from "styled-components";
import ReactMapGL, { StaticMap, GeolocateControl, NavigationControl } from "react-map-gl";

import Pins from "./Pins";
import {SearchContext, SearchFilters} from "../App";
import { MAPBOX_TOKEN } from "../constants";
import { getFilteredPins } from "../utils/getFilteredPins";
import Geocoder from "react-map-gl-geocoder";
import InteractiveMap from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { DeckGL } from "@deck.gl/react";

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
    const myMap = React.createRef<InteractiveMap>();

export const Map = (props: MapProps) => {
    const {viewState, setViewState, onClickPin } = props;
    const searchFilters = useContext(SearchContext);
    const filteredPins = getFilteredPins(searchFilters);




        return (
            <div>
              <ReactMapGL
                  viewState={viewState}
                  getCursor={() => "cursor"}
                  onViewStateChange={setViewState}
                  ref={myMap}
                  width="100vw"
                  height="100vh"
                  style={{ zIndex: 50 }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxApiAccessToken={MAPBOX_TOKEN}
              >


                <Navigation>
                    <Geocoder onViewportChange={(data: any) => {
                        console.log(data);
                        let { longitude, latitude, zoom } = data;
                        if (zoom > 10) {
                            zoom = 10;
                        }
                        setViewState({
                            viewState: { ...viewState, longitude, latitude, zoom }
                        });
                    }} position={"top-left"} countries={"US"} mapRef={myMap} mapboxApiAccessToken={MAPBOX_TOKEN}/>
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
                <Pins data={filteredPins} onClick={onClickPin} onHover={() => {}} />
              </ReactMapGL>
            </div>
        );
    }
