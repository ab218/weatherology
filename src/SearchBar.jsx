/* eslint react/no-children-prop: ["error"] */
import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { SearchBarContainer, searchBarStyles } from './styles';
import './app.css';

const SearchBar = ({ currentWeather, getPlace, loadPosition }) => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const predictLocation = async (input) => {
    try {
      const data = await axios.post('/api/google', { input });
      setItems(data.data.predictions);
    } catch (e) {
      console.log(e);
    }
  };

  let requestTimer = null;

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
          setValue(value);
          setItems([item]);
        }}
        onChange={(event, value) => {
          setValue(value);
          clearTimeout(requestTimer);
          requestTimer = predictLocation(value);
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
};

export default SearchBar;
