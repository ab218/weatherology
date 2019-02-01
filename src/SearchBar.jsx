import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete'

class OutlinedTextFields extends React.Component {
  state = {
      value: '',
      items: [],
      search: 'Enter Location'
  };

  menuStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    padding: '2px 0',
    fontSize: '90%',
    overflow: 'auto',
  }

  predictLocation = async (input) => {
    try {
        const data = await axios.post('/api/google', { input })
        this.setState({items: data.data.predictions})
    } catch (e) {
        console.log(e);
    }
  }

  getPlace = async (input) => {
      try {
          const place = await axios.post('api/google/info', { input })
          console.log(place)
          const coords = await axios.post('api/google/coords', { placeid: place.data })
          console.log(coords)
          this.props.getWeatherData({
              lat: coords.data.result.geometry.location.lat, 
              lng: coords.data.result.geometry.location.lng
          })
      } catch (e) {
          console.log(e);
      }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '10em', 
            height: '50px', 
            padding: '0' 
            }}>
        <Autocomplete
          autoHighlight
          inputProps={{ id: 'states-autocomplete', style: { width: '100%', height: '100%', fontSize: '1.5em' } }}
          wrapperStyle={{ position: 'relative', display: 'inline-block', width: '50%', height: '100%' }}
          value={this.state.value}
          items={this.state.items}
          getItemValue={(item) => item.description}
          onSelect={(value, item) => {
            // set the menu to only the selected item
            this.setState({ value, items: [ item ] })
          }}
          onChange={(event, value) => {
            this.setState({ value })
            clearTimeout(this.requestTimer)
            this.requestTimer = this.predictLocation(value)
          }}
          renderMenu={(items, value, style) => (
          <div style={{ ...style, ...this.menuStyle }} children={items}/>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.description}
            >{item.description}</div>
          )}
        />
        <button
        onClick={() => this.getPlace(this.state.value)}
        style={{margin: '0 1em', height: '100%'}}
        >
        Submit
        </button>
        <button
        onClick={() => this.props.loadPosition()}
        style={{margin: '0 1em', height: '100%'}}
        >
        Use Current Location
        </button>
        </div>
    );
  }
}

export default OutlinedTextFields;