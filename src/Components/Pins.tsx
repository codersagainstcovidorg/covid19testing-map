import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import SvgLocationIcon from "../LocationIcon";
import ReactGA from 'react-ga';


export interface PinsProps {
    data: any;
    onClick: Function,
    onHover: Function
};

const SIZE = 40;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent<PinsProps> {

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    }

    handleLinkClicked(locationId: string): void {
        ReactGA.event({
            category: 'Location',
            action: 'View',
            label: locationId,
        })
    }

    render() {
        const { data, onClick, onHover } = this.props;

        // TODO: Make a real type for the place data
        return data.map((place: any, index: number) => {
            return (
                <Marker key={`marker-${index}`} longitude={place.lng} latitude={place.lat}>
                        <SvgLocationIcon
                            height={SIZE}
                            style={{
                                cursor: "pointer",
                                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`}}
                            onClick={() => {
                                onClick(place);
                                this.handleLinkClicked(place.location_id);
                            }}
                            onMouseOver={() => onHover(place)}
                        />
                        {/*<LocalHospital viewBox="0 0 24 24" style={{ fontSize: '11px' }} />*/}
                </Marker>
            )
        });
    }
}