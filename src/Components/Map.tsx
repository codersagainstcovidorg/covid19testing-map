
import React, { useState } from 'react';

import { DeckGL } from "@deck.gl/react";
import mapboxgl from 'mapbox-gl';

import { StaticMap } from 'react-map-gl';
import PLACES from '../data/data.json';
import Pins from './Pins';
import { WebMercatorViewport } from '@deck.gl/core';
import { SearchContext } from '../App';

// COVID19 Mapbox public key
const token = 'pk.eyJ1IjoibWFydGluYW1wcyIsImEiOiJjazd3aDNoaTQwMjNuM2ZtZTRrcm1wOHlqIn0.1c2tf5eJPHyAvC1GgO4zzg';

type MapProps = {
    onClickPin: Function;
    lockMap: boolean;
}

export const Map = ({ onClickPin, lockMap }: MapProps ) => {
    const bounds = new mapboxgl.LngLatBounds();
    PLACES.forEach(p => {
        bounds.extend(new mapboxgl.LngLat(p.lng, p.lat));
    });

    const boundedViewport = {
        ...new WebMercatorViewport({
            width: window.innerWidth,
            height: window.innerHeight
        }).fitBounds([bounds.getNorthEast().toArray(), bounds.getSouthWest().toArray()], {
            padding: 7,
            offset: [40, 20]
        }), pitchMaybe: 15, bearingMaybe: 108
    };

    const [viewport, setViewport] = useState(boundedViewport);
    const layers: any = [];

    return <SearchContext.Consumer>
        {
            (searchFilters) => {
                const filteredPins = PLACES.filter(place => {

                   /* export interface SearchFilters {
                        'is-verified': boolean;
                        'is-location-screening-patients': boolean;
                        'is-location-collecting-specimens': boolean;
                        'is-location-accepting-third-party-orders-for-testing': boolean;
                        'is-location-only-testing-patients-that-meet-criteria': boolean;
                        'is-location-by-appointment-only': boolean;
                      }*/
                    Object.keys(searchFilters).forEach(key => {

                    });



                    if (searchFilters['is-verified'] && place['is-verified'] !== 'TRUE') {
                        console.log('excluding');
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
                    initialViewState={viewport}
                    width="100vw"
                    height="100vh"
                    layers={layers}
                    controller={!lockMap}
                    getCursor={() => { return 'cursor'; }}
                    onViewStateChange={(viewport) => setViewport({ ...viewport })}
                >
                    <StaticMap
                        width="100vw"
                        height="100vh"
                        style={{ zIndex: 50 }}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        mapboxApiAccessToken={token}
                    >
                        <Pins data={filteredPins} onClick={onClickPin} onHover={() => {}} />;
                    </StaticMap>
                </DeckGL>
            }
        }
    </SearchContext.Consumer>;
};
