import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import SvgHospitalicon from "../HospitalIcon";


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
                        style={{cursor: "pointer"}}
                        onClick={() => onClick(place)}
                        onMouseOver={() => onHover(place)}
                    >
                        <SvgHospitalicon/>
                        {/*<LocalHospital viewBox="0 0 24 24" style={{ fontSize: '11px' }} />*/}
                    </span>
                </Marker>
            )
        });
    }
}