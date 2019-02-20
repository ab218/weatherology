/* eslint react/no-children-prop: ["error"] */
import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { SearchBarContainer, searchBarStyles } from './styles';
import './app.css';

class SearchBar extends React.Component {
  state = {
    value: '',
    items: [],
  };

  predictLocation = async (input) => {
    try {
      const data = await axios.post('/api/google', { input });
      this.setState({ items: data.data.predictions });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      currentWeather, getPlace, loadPosition,
    } = this.props;
    const { value, items } = this.state;
    return (
      <SearchBarContainer
        currentWeather={currentWeather}
      >
        <Autocomplete
          autoHighlight
          inputProps={{
            id: 'states-autocomplete',
            style: searchBarStyles.inputProps,
          }}
          wrapperStyle={searchBarStyles.wrapperStyles}
          value={value}
          items={items}
          getItemValue={item => item.description}
          onSelect={(value, item) => {
            // set the menu to only the selected item
            this.setState({ value, items: [item] });
          }}
          onChange={(event, value) => {
            this.setState({ value });
            clearTimeout(this.requestTimer);
            this.requestTimer = this.predictLocation(value);
          }}
          renderMenu={(children, value, style) => (
            <div style={{ ...style }}>
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''} ${item.id === items[items.length - 1].id ? 'lastItem' : ''} ${item.id === items[0].id ? 'firstItem' : ''}`}
              key={item.description}
            >
              {item.description}
            </div>
          )}
        />
        <Tooltip title="Search">
          <Button
            style={searchBarStyles.submitButton}
            onClick={() => getPlace(value)}
          >
            <i className="fas fa-search" />
          </Button>
        </Tooltip>
        <Tooltip title="Use Current Location">
          <Button
            style={searchBarStyles.currentLocationButton}
            onClick={() => loadPosition()}
          >
            <i className="fas fa-location-arrow" />
          </Button>
        </Tooltip>
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
