import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map'

class App extends Component {
  
  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  /* followed by Yahya Elharony
     https://www.youtube.com/watch?v=W5LhLZqj76s */
  
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


    // Promise with axios app
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      console.log(response.data.response.groups[0].items);

      this.setState({
        venues: response.data.response.groups[0].items
      }, 
      // wait till venues array is full loaded
      this.renderMap())
    })  
    .catch(error => {console.log('There are no data to display' + error)})
  }

 

  // setting up Google Map API
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZaSwddTJZ6RrHZ7QTcFtEgvScuOmZ_uk&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.390205, lng: 2.154007},
          zoom: 13
    });

    // add markers from FourSquare API

    this.state.venues.map( venueFS => {

      var marker = new window.google.maps.Marker({
        position: {lat: venueFS.venue.location.lat, 
                   lng: venueFS.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP
      });
  
    })

    
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
