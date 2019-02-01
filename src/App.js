import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card'
import SearchBar from './SearchBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
    };
  }

  getCurrentPosition = (options = { timeout: 10000, maximumAge: 3600000 }) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      this.getWeatherData({ lat: position.coords.latitude, lng: position.coords.longitude })
    } catch (err) {
      // if user does not allow location tracking, default to vancouver
      if (err.code === 1 || err.code === 3) {
        return this.getWeatherData({ lat: 49.2827, lng: -123.1207 })
      }
      console.log('failed to get position.', err);
    }
  }

  getWeatherData = async (coords) => {
    try {
      const data = await axios.post('/api/weather', { 
        lat: coords.lat, 
        lng: coords.lng 
      })
      this.setState({ weatherData: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar 
        getWeatherData={this.getWeatherData}
        loadPosition={this.loadPosition}
        />
        <Card weatherData={this.state.weatherData}/>
      </div>
    );
  }
}

export default App;
