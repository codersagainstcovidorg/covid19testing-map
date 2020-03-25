import React from 'react';
import { Marker } from 'react-map-gl';
import ReactGA from 'react-ga';
import Supercluster from 'supercluster';
import SvgLocationIcon from '../LocationIcon';
import Cluster from './Cluster';

export interface PinsProps {
    data: any;
    onClickPin: Function,
    onClickCluster: Function,
    mapRef: any;
}

const SIZE = 40;

interface ClusterMarkerParams {
    cluster: any;
    superCluster: Supercluster;
    onClickCluster: Function;
    latitude: number;
    longitude: number;
    zoom: number;
}

const ClusterMarker = (args: ClusterMarkerParams) => {
  const {
    cluster, onClickCluster, latitude, longitude, zoom,
  } = args;
  return (
    <div
      style={{
        background: '#c82c25',
        borderRadius: '50%',
        width: '25px',
        padding: '5px 7px',
        textAlign: 'center',
        lineHeight: '29px',
        color: 'white',
        cursor: 'pointer',
      }}
      onClick={() => {
        onClickCluster(latitude, longitude, zoom);
      }}
    >
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
    });
  }

  shouldComponentUpdate(nextProps: Readonly<PinsProps>): boolean {
    return nextProps.data.length !== this.props.data.length;
  }

  render() {
    const {
      data, onClickPin, mapRef, onClickCluster,
    } = this.props;
    if (!mapRef.current || !mapRef.current.getMap()) return null;

    // TODO: Make a real type for the place data
    return (
      <Cluster map={mapRef.current.getMap()} radius={32} extent={512} nodeSize={64} element={ClusterMarker} onClickCluster={onClickCluster}>
        {data.map((place: any, index: number) => (
          <Marker key={`marker-${index}`} longitude={place.location_longitude} latitude={place.location_latitude}>
            <SvgLocationIcon
              height={SIZE}
              style={{
                cursor: 'pointer',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
              }}
              onClick={() => {
                onClickPin(place);
                this.handleLinkClicked(place.location_id);
              }}
            />
          </Marker>
        ))}
      </Cluster>
    );
  }
}
