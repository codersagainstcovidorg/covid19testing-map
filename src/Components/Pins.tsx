import React from 'react';
import { Marker } from 'react-map-gl';
import SvgLocationIcon from "../LocationIcon";
import ReactGA from 'react-ga';
import Cluster from './Cluster';
import Supercluster from 'supercluster';

export interface PinsProps {
    data: any;
    onClick: Function,
    mapRef: any;
};

const SIZE = 40;

interface ClusterMarkerParams {
    cluster: any;
    superCluster: Supercluster;
}

const ClusterMarker = (args: ClusterMarkerParams) => {
    const { cluster } = args;
    return (
        <div style={{
            background: '#c82c25',
            borderRadius: '50%',
            width: '25px',
            padding: '5px 7px',
            textAlign: 'center',
            lineHeight: '29px',
            color: 'white'
        }}>
            {cluster.properties.point_count_abbreviated}
        </div>
    );
};

export default class Pins extends React.Component<PinsProps> {
    handleLinkClicked(locationId: string): void {
        ReactGA.event({
            category: 'Location',
            action: 'View',
            label: locationId,
        })
    }

    componentShouldUpdate(nextProps: Readonly<PinsProps>): boolean {
        return nextProps.data.length !== this.props.data.length;
    }

    render() {
        const { data, onClick, mapRef } = this.props;
        if (!mapRef.current)
            return null;

        // TODO: Make a real type for the place data
        return (
            <Cluster map={mapRef.current.getMap()} radius={32} extent={512} nodeSize={64} element={ClusterMarker}>
                {data.map((place: any, index: number) => {
                    return (
                        <Marker key={`marker-${index}`} longitude={place.lng} latitude={place.lat}>
                            <SvgLocationIcon
                                height={SIZE}
                                style={{
                                    cursor: "pointer",
                                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                                }}
                                onClick={() => {
                                    onClick(place);
                                    this.handleLinkClicked(place.location_id);
                                }}
                            />
                        </Marker>
                    )
                })}
            </Cluster>
        );
    }
}