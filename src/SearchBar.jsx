import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class OutlinedTextFields extends React.Component {
  state = {
      search: 'Enter Location'
  };

  componentDidMount = () => {
      this.geoCode('van');
  }

  geoCode = async (input) => {
      try {
        const data = await axios.post('/api/google', {input})
        console.log(data.data.predictions);
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
        <div>
        <TextField
          id="outlined-bare"
          onChange={this.handleChange('search')}
          value={this.state.search}
          margin="normal"
          variant="outlined"
        />
        </div>
    );
  }
}

export default OutlinedTextFields;