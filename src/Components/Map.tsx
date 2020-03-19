
import React from 'react';
import { DeckGL } from "@deck.gl/react";
import { StaticMap, GeolocateControl } from 'react-map-gl';
import PLACES from '../data/data.json';
import Pins from './Pins';
import { SearchContext } from '../App';

// COVID19 Mapbox public key
const token = 'pk.eyJ1IjoibWFydGluYW1wcyIsImEiOiJjazd3aDNoaTQwMjNuM2ZtZTRrcm1wOHlqIn0.1c2tf5eJPHyAvC1GgO4zzg';

type MapProps = {
    onClickPin: Function;
    lockMap: boolean;
    viewState: any;
    setViewState: Function;
}

export const Map = ({ onClickPin, lockMap, viewState, setViewState }: MapProps ) => {
    return <SearchContext.Consumer>
        {
            (searchFilters) => {
                const filteredPins = (PLACES as any).filter((place: any) => {
                    Object.keys(searchFilters).forEach(key => {

                    });

                    if (searchFilters['is-verified'] && place['is-verified'] !== 'TRUE') {
                        return false;
                    }

                    if (searchFilters['is-location-collecting-specimens'] && place['is-location-collecting-specimens'] !== 'TRUE') {
                        return false;
                    }

                    if (searchFilters['is-location-by-appointment-only'] && place['is-location-by-appointment-only'] !== 'TRUE') {
                        return false;
                    }

                    if (searchFilters['is-location-only-testing-patients-that-meet-criteria'] && place['is-location-only-testing-patients-that-meet-criteria'] !== 'TRUE') {
                        return false;
                    }
      
                    return true;
                });

                return <DeckGL
                    viewState={viewState}
                    width="100vw"
                    height="100vh"
                    controller={!lockMap}
                    getCursor={() => { return 'cursor'; }}
                    onViewStateChange={(viewState: any) => setViewState(viewState)}
                    // @ts-ignore
                    glOptions={{onError: console.error}}
                >
                    <StaticMap
                        width="100vw"
                        height="100vh"
                        style={{ zIndex: 50 }}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        mapboxApiAccessToken={token}
                    >
                        <div style={{display: 'none', top: 62, left: 15, position: 'absolute', zIndex: 1}}>
                            <GeolocateControl
                                positionOptions={{enableHighAccuracy: true}}
                                trackUserLocation={true}
                            />
                        </div>
                        <Pins data={filteredPins} onClick={onClickPin} onHover={() => {}} />;
                    </StaticMap>
                </DeckGL>
            }
        }
    </SearchContext.Consumer>;
};
