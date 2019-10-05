import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map'
import { makeEmptyAggregatedTestResult } from '@jest/test-result';

class App extends Component {
  
  state = {
    venues: [],
    query: ''
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
          zoom: 14
    });

    var boundaries = new window.google.maps.LatLngBounds();

    var mapCanvas = document.getElementById('map');
    mapCanvas.setAttribute("tabIndex","0");
    mapCanvas.addEventListener("focus", function(ev){this.style.outline = "2px solid blue"});
    mapCanvas.addEventListener("blur", function(ev){this.style.outline = "0"});

    // add infoWindow

    var infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map( (venueFS, index) => {

      // add markers

      var marker = new window.google.maps.Marker({
        position: {lat: venueFS.venue.location.lat, 
                   lng: venueFS.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: venueFS.venue.name,
        label: `${index}`,
      /*  
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        }
      */
      });

      // infoWindow content

      var contentString = `<div className='infoWindow' tabIndex='0'>
      <h3>${venueFS.venue.name}</h3>
      <p>${venueFS.venue.location.address}</p>
      <p>${venueFS.venue.location.city}</p>
      <p>${venueFS.venue.hereNow.summary}</p>
      </div>`
  

      // click infoWindow
      marker.addListener('click', function() {

        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      
      });

      
      // tab + Enter infoWindow
      marker.addListener('keypress', function(e){
        let button = e.keyCode;
        let character = e.which;
  
        if (button === 13 || character === 13) {
          infowindow.setContent(contentString)
          infowindow.open(map, marker);
        }

      })
      

      // to fit infoWindows on map
      boundaries.extend(marker.position) 
    })

    map.fitBounds(boundaries)
  }

  // show Venues in list
  showVenues() {
        
  }
  

  render() {  
    return (
      <div className="App">
        <Header></Header>
        <div className="main">
          <Sidebar query={this.state.query} showVenues={this.showVenues}></Sidebar>
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
