import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Footer from './components/Footer'


class App extends Component {
  
  state = {
    venues: [],
    markers: [],
    filtered: [],
    loading: true,
    showList: false,
    query: ' '
  }

  componentDidMount() {
    this.getVenues()
  }

  /* followed by Yahya Elharony
     https://www.youtube.com/watch?v=W5LhLZqj76s */
  
  // set up FourSquare API
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

      this.setState({
        venues: response.data.response.groups[0].items
      }, 
      console.log(response.data.response.groups[0].items),
      // wait till venues array is fully loaded
      this.renderMap())
    })  
    .catch(error => {console.log('There are no data to display' + error)})
  }
 
  // set up Google Map API
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZaSwddTJZ6RrHZ7QTcFtEgvScuOmZ_uk&callback=initMap')
    window.initMap = this.initMap;

    // https://developers.google.com/maps/documentation/javascript/events
    window.gm_authFailure = function() {
      alert('Error with loading the Google Map!')
    }
    
    // hide error message and display the results
    this.setState({loading: false})
    this.setState({showList: true})
  }

  // set up Map
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

    // array of markers
    var markers = [];
    
    (this.state.filtered.length > 0 ? this.state.filtered : this.state.venues)
    .map( (venueFS, index) => {

      // add markers
        var marker = new window.google.maps.Marker({
        position: {lat: venueFS.venue.location.lat, 
                   lng: venueFS.venue.location.lng},
        map: map,
     //   animation: window.google.maps.Animation.DROP,
        title: venueFS.venue.name,
        label: `${index}`,
        number: venueFS.venue.id
      
      });

      // infoWindow content
      var contentString = `<div className='infoWindow' tabIndex='0'>
      <h3>${venueFS.venue.name}</h3>
      <p>${venueFS.venue.location.address}</p>
      <p>${venueFS.venue.location.city}</p>
      <p>${venueFS.venue.hereNow.summary}</p>
      </div>`
  
      // show infoWindow on marker click
      marker.addListener('click', function() {

        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      
      });

      // show infowindow on tab + Enter
      marker.addListener('keypress', function(e){

        let button = e.keyCode;
        let character = e.which;
  
        if (button === 13 || character === 13) {

          infowindow.setContent(contentString)
          infowindow.open(map, marker);
        }
      });  
      
      // to fit infoWindows on map
      boundaries.extend(marker.position);
      
      // put all markers in state
      markers.push(marker);
      return this.setState({markers});
    
    });
  
    // fit map into screen
    map.fitBounds(boundaries);

  }

  // filter venues
  showVenues = (e) => {
     
      let keyword = e.target.value.trimStart();
      this.setState({query: keyword});

      // show filtered venues on sidebar
      let filtered = this.state.venues.filter(
          (place) => {return place.venue.name.toLowerCase().includes(keyword.toLowerCase())}
      );

      // catch filtered venues
      this.setState({filtered});

      // show filtered markers
      this.state.markers.forEach(showMarker);

      function showMarker(marker) {
      
                  ( marker.title.toLowerCase().includes(keyword.toLowerCase()) === true
                  ? 
                    marker.setVisible(true)
                  : 
                    marker.setVisible(false)
                  ) 
      }
  }

  // show InfoWindow and marker after clicking on Sidebar
  showInfowindow = (e) => {
   
    // get id venue and marker
    let idValue = e.target.id
  
    let chooseMarker = this.state.markers.filter((marker) => 
      { return marker.number.includes(idValue)}
    ) 
  
    var infowindow = new window.google.maps.InfoWindow({
      content: chooseMarker[0].title
    });

    chooseMarker.forEach(marker => {

      // added animation to marker
      function toggleBounce () {

          marker.setAnimation(null);

        if (marker.getAnimation() != null) {

            marker.setAnimation(null);

        } else {

            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function() {marker.setAnimation(null)}, 700)
        }

        // show infoWindow
        infowindow.open(window.map, marker);
        setTimeout(function () { infowindow.close(); }, 700);

      }

      toggleBounce();
     
    })        
  }

  // show InfoWindow and marker after pressing the Enter on Sidebar
  showInfowindowOnPress = (e) => {
    if (e.key === "Enter") {
      this.showInfowindow(e)
    }
  }

  // toggle button Menu
  toggleButton = () => {
    this.setState(preState => ({
    showList: !preState.showList
    }))
  }

  render() {  
    return (
      <div className="App">
        <Header toggleButton={this.toggleButton}
                showList={this.state.showList}
        />
        <main className="main" role="main">
          {this.state.showList ?
          <Sidebar 
                venues={(this.state.filtered.length === 0 && this.state.query === ' ') ? this.state.venues : this.state.filtered} 
                markers={this.state.markers}
                showInfowindow={this.showInfowindow}
                showInfowindowOnPress={this.showInfowindowOnPress}
                showVenues={this.showVenues}
                showList={this.state.showList}
                query={this.state.query}
          /> : null }
          {this.state.loading === false ? <Map /> :
          <p className="map-error"><span className="map-error-wait">Please wait.</span><br></br> We are connecting to Google Map and Foursquare API. </p>
          }
          
        </main>
        <Footer/>
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
