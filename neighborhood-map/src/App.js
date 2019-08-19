import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map'

class App extends Component {
  
  componentDidMount() {
    this.getVenues()
    this.renderMap()
  }

  // followed by Yahya Elharony
  // https://www.youtube.com/watch?v=W5LhLZqj76s
  
  // setting up FourSquare API
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id:  'DWLFRW5WP4RGSFSPTQEBRZ3QGBQP1EYNWL45NMQNTWXJ4K3J',
      client_secret: 'A0SSRHQR2MSPEFLXJ3I3OSJH23XDYL13XEASLLVV0JMLYYNK',
      query: 'arts',
      // Barcelona
      ll: '41.390205, 2.154007',
      v: '20180323'
    }

  // Promise

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {console.log(response.data.response.groups[0].items)})
  .catch(error => {console.log('There are no data to display' + error)})
  }

 

  // setting up Google Map API
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZaSwddTJZ6RrHZ7QTcFtEgvScuOmZ_uk&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
    });
  }

  

  render() {  
    return (
      <div className="App">
        <Header></Header>
        <div className="main">
          <Sidebar></Sidebar>
          <Map></Map>
        </div>
      </div>
    );
  }
}

// script for google map

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
  
}


export default App;
