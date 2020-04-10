import React from 'react';
import { Marker } from 'react-map-gl';
import Supercluster from 'supercluster';
import styled from 'styled-components';

import LocationIcon from './LocationPin';
import Cluster from './Cluster';
import { trackLinkClicked } from '../../utils/tracking';

export interface PinsProps {
  data: any;
  onClickPin: Function;
  onClickCluster: Function;
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

const ClusterMarkerContainer = styled.div`
  background: #c82c25;
  border-radius: 50%;
  width: 25px;
  padding: 5px 7px;
  text-align: center;
  line-height: 29px;
  color: white;
  cursor: pointer;
`;

const ClusterMarker = (props: ClusterMarkerParams) => {
  const { cluster, onClickCluster, latitude, longitude, zoom } = props;
  return (
    <ClusterMarkerContainer
      onClick={() => {
        onClickCluster(latitude, longitude, zoom);
      }}
    >
      {cluster.properties.point_count_abbreviated}
    </ClusterMarkerContainer>
  );
};

export default class Pins extends React.Component<PinsProps> {
  shouldComponentUpdate(nextProps: Readonly<PinsProps>): boolean {
    const { data } = this.props;
    return nextProps.data.length !== data.length;
  }

  render() {
    const { data, onClickPin, mapRef, onClickCluster } = this.props;
    if (!mapRef.current || !mapRef.current.getMap()) return null;

    // TODO: Make a real type for the place data
    return (
      <Cluster
        map={mapRef.current.getMap()}
        radius={32}
        extent={512}
        nodeSize={64}
        element={ClusterMarker}
        onClickCluster={onClickCluster}
      >
        {data.map((place: any, index: number) => {
          /* eslint-disable react/no-array-index-key */
          return (
            <Marker
              key={`marker-${index}`}
              longitude={place.location_longitude}
              latitude={place.location_latitude}
            >
              <LocationIcon
                height={SIZE}
                style={{
                  cursor: 'pointer',
                  transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                }}
                onClick={() => {
                  onClickPin(place);
                  trackLinkClicked(place.location_id);
                }}
              />
            </Marker>
          );
        })}
      </Cluster>
    );
  }
}
