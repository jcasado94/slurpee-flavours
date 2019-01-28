import React, { Component } from 'react';
import '../styles/Map.css';

class Map extends Component {

  constructor() {
    super();
    this.initMap = this.initMap.bind(this);
  }

  initMap() {
    window.initMap = function() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }.bind(this);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.getElementById('map').appendChild(script);
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    return(
      <div className="Map">
        <div id="map">
        </div>
      </div>
    )
  }

}

export default Map;