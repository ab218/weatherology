import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete'
import Button from '@material-ui/core/Button';
import { SearchBarContainer, searchBarStyles } from './styles'
import './app.css'

class SearchBar extends React.Component {
  state = {
      value: '',
      items: [],
      search: 'Enter Location'
  };

  predictLocation = async (input) => {
    try {
        const data = await axios.post('/api/google', { input })
        this.setState({items: data.data.predictions})
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
        <SearchBarContainer>
          <Autocomplete
            autoHighlight
            inputProps={{ 
                id: 'states-autocomplete', 
                  style: searchBarStyles.inputProps
            }}
            wrapperStyle={searchBarStyles.wrapperStyles}
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
            <div style={{ ...style }} children={items}/>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={item.description}
              >
                {item.description}
              </div>
            )}
          />
          <Button
            style={searchBarStyles.submitButton}
            onClick={() => this.props.getPlace(this.state.value)}
            >
            Submit
          </Button>
          <Button
            style={searchBarStyles.currentLocationButton}
            onClick={() => this.props.loadPosition()}
            >
            Use Current Location
          </Button>
        </SearchBarContainer>
    );
  }
}

export default SearchBar;