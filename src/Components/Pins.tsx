import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

import LocalHospital from '@material-ui/icons/LocalHospital';

export interface PinsProps {
    data: any;
    onClick: Function,
    onHover: Function
};

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent<PinsProps> {
    render() {
        const { data, onClick, onHover } = this.props;

        // TODO: Make a real type for the place data
        return data.map((place: any, index: number) => {
            return (
                <Marker key={`marker-${index}`} longitude={place.lng} latitude={place.lat}>
                    <span
                        onClick={() => onClick(place)}
                        onMouseOver={() => onHover(place)}
                        style={{ fontSize: '16px' }}
                    >
                        <LocalHospital />
                    </span>
                </Marker>
            )
        });
    }
}