import React, {Component} from 'react';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map'

class App extends Component {
  
  componentDidMount() {
    this.renderMap()
  }

  // followed by Yahya Elharony
  // https://www.youtube.com/watch?v=W5LhLZqj76s
  
  // setting up Google Map
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
