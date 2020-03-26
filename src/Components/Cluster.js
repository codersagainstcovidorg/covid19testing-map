import Supercluster from 'supercluster';
import { point } from '@turf/helpers';
import { Children, PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-map-gl';
import { calculateNextZoomLevel } from 'react-mapbox-gl-cluster/dist/common/utils';

const childrenKeys = (children) => Children.toArray(children).map((child) => child.key);

const shallowCompareChildren = (prevChildren, newChildren) => {
  if (Children.count(prevChildren) !== Children.count(newChildren)) {
    return false;
  }

  const prevKeys = childrenKeys(prevChildren);
  const newKeys = new Set(childrenKeys(newChildren));
  return (
    prevKeys.length === newKeys.size && prevKeys.every((key) => newKeys.has(key))
  );
};

// Originally from https://github.com/jamalx31/mapbox-supercluster-example/blob/master/src/Cluster.js
class Cluster extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clusters: [],
    };

    this.recalculate = this.recalculate.bind(this);
    this.createCluster = this.createCluster.bind(this);
  }

  componentDidMount() {
    this.createCluster(this.props);
    this.recalculate();

    const { map } = this.props;

    map.on('moveend', this.recalculate);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.minZoom !== prevState.minZoom
        || nextProps.maxZoom !== prevState.maxZoom
        || nextProps.radius !== prevState.radius
        || nextProps.extent !== prevState.extent
        || nextProps.nodeSize !== prevState.nodeSize
        || !shallowCompareChildren(prevState.children, nextProps.children)) {
      return nextProps;
    }
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      minZoom, maxZoom, radius, extent, nodeSize, children,
    } = this.props;
    if (prevProps.minZoom !== minZoom
        || prevProps.maxZoom !== maxZoom
        || prevProps.radius !== radius
        || prevProps.extent !== extent
        || prevProps.nodeSize !== nodeSize
        || !shallowCompareChildren(children, prevProps.children)) {
      this.createCluster(this.props);
      this.recalculate();
    }
  }

  createCluster(props) {
    const {
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
      children,
      innerRef,
    } = props;

    const cluster = new Supercluster({
      minZoom,
      maxZoom,
      radius,
      extent,
      nodeSize,
    });

    const points = Children.map(children, (child) => {
      if (child) {
        if (!Number.isFinite(child.props.longitude) || !Number.isFinite(child.props.latitude)) {
          return null;
        }

        return point([child.props.longitude, child.props.latitude], child);
      }
      return null;
    });

    cluster.load(points);
    this.cluster = cluster;
    if (innerRef) innerRef(this.cluster);
  }

  recalculate() {
    const { map } = this.props;
    const zoom = map.getZoom();
    const bounds = map.getBounds().toArray();
    const bbox = bounds[0].concat(bounds[1]);
    const clusters = this.cluster.getClusters(bbox, Math.floor(zoom));
    this.setState(() => ({ clusters }));
  }

  render() {
    const { clusters } = this.state;
    const { onClickCluster, map, element } = this.props;
    const clustersMapped = clusters.map((cluster) => {
      if (cluster.properties.cluster) {
        const [longitude, latitude] = cluster.geometry.coordinates;

        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          return null;
        }

        return createElement(Marker, {
          longitude,
          latitude,
          // TODO size
          offsetLeft: -28 / 2,
          offsetTop: -28,
          children: createElement(element, {
            cluster,
            superCluster: this.cluster,
            onClickCluster,
            latitude,
            longitude,
            zoom: calculateNextZoomLevel(map.getZoom(), cluster.maxZoom, 1.5),
          }),
          key: `cluster-${cluster.properties.cluster_id}`,
        });
      }
      const { type, key, props } = cluster.properties;
      return createElement(type, { key, ...props });
    });
    return clustersMapped;
  }
}

Cluster.propTypes = {
  /** Mapbox map object */
  map: PropTypes.object || PropTypes.bool,
  /** Minimum zoom level at which clusters are generated */
  minZoom: PropTypes.number,
  /** Maximum zoom level at which clusters are generated */
  maxZoom: PropTypes.number,
  /** Cluster radius, in pixels */
  radius: PropTypes.number,
  /** (Tiles) Tile extent. Radius is calculated relative to this value */
  extent: PropTypes.number,
  /** Size of the KD-tree leaf node. Affects performance */
  nodeSize: PropTypes.number,
  /** ReactDOM element to use as a marker */
  element: PropTypes.func,
  /**
   * Callback that is called with the supercluster instance as an argument
   * after componentDidMount
   */
  /* eslint-disable react/no-unused-prop-types */
  innerRef: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
  /** Markers as children */
  children: PropTypes.node,

  onClickCluster: PropTypes.func,
};

Cluster.defaultProps = {
  map: null,
  minZoom: 0,
  maxZoom: 16,
  radius: 40,
  extent: 512,
  nodeSize: 64,
  element: () => {},
  innerRef: () => {},
  children: null,
  onClickCluster: () => {},
};

export default Cluster;
