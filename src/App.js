import React, { Component } from 'react';
import axios from 'axios';
import cloudy from './cloudy.jpeg'
import Card from './Card'
import SearchBar from './SearchBar'
import styled from 'styled-components';

const AppContainer = styled.div`
text-align: center;
background-image: url(${props => props.backgroundImage});  
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: null,
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

  getImage = (image) => {
      let backgroundImage = null;
      switch (image) {
      case 'cloudy':
        backgroundImage = cloudy;
        break;
      case 'partly-cloudy-day':
        backgroundImage = cloudy;
        break;
      default:
        return backgroundImage;
      }
      return backgroundImage;
  }

  getWeatherData = async (coords) => {
    try {
      const data = await axios.post('/api/weather', { 
        lat: coords.lat, 
        lng: coords.lng 
      })
      this.setState({ backgroundImage: this.getImage(data.data.currently.icon), weatherData: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <AppContainer backgroundImage={this.state.backgroundImage}>
        <SearchBar 
        getWeatherData={this.getWeatherData}
        loadPosition={this.loadPosition}
        />
        <Card weatherData={this.state.weatherData}/>
      </AppContainer>
    );
  }
}

export default App;
