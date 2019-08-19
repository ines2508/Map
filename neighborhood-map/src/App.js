import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map'

function App() {
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

export default App;
