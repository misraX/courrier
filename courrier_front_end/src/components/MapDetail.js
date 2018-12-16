import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
const mapStyles = {
  width: '500px',
  height: '500px'
};
/**
 * Google map.
 *
 * @class MapDetail
 * @extends {Component}
 */
class MapDetail extends Component {
  static propTypes = {
    name: PropTypes.string
  };
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const { name, initialCenter } = this.props;
    return (
      <Map google={this.props.google} zoom={14} initialCenter={initialCenter} style={mapStyles}>
        <Marker onClick={name ? this.onMarkerClick : () => null} />
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyAYF8li41dOZoZD8qOLbU8Jz4eloujR0_w'
}))(MapDetail);
