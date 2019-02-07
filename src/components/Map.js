import React, { Component } from 'react';
import '../styles/Map.css';
import StoreHandler from '../handlers/storeHandler';

class Map extends Component {

  constructor() {
    super();
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    return (
      <div className="Map">
        <div id="map">
        </div>
      </div>
    )
  }

  initMap() {
    window.initMap = function () {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
      this.initMarkers();
    }.bind(this);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.getElementById('map').appendChild(script);
  }

  initMarkers() {
    StoreHandler.getAllStores().then(function (markers) {
      markers.forEach(retrievedMarker => {
        const marker = new window.google.maps.Marker({
          position: { lat: retrievedMarker.lat, lng: retrievedMarker.lng },
          map: this.map,
          title: retrievedMarker.name
        });
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<h1>${retrievedMarker.name}</h1></br><b>This is bold</b>content.`
        });
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        })
      });

    }.bind(this));
  }

}

export default Map;