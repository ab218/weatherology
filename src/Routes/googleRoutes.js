require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

const googleAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

router.post('/info', async (req, res) => {
  try {
    const response = await googleAPI.get(`/place/findplacefromtext/json?inputtype=textquery&input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`);
    if (!response.data.candidates[0]) {
      return console.log('Please enter a valid location');
    }
    res.json(response.data.candidates[0].place_id);
  } catch (e) {
    console.log(e);
  }
  return null;
});

router.post('/coords', async (req, res) => {
  try {
    const response = await googleAPI.get(`/place/details/json?placeid=${req.body.placeid}&key=${process.env.GOOGLE_API_KEY}`);
    res.json(response.data);
  } catch (e) {
    console.log(e);
  }
});

router.post('/location', async (req, res) => {
  try {
    const response = await googleAPI.get(`/geocode/json?latlng=${req.body.lat},${req.body.lng}&result_type=locality&key=${process.env.GOOGLE_API_KEY}`);
    if (response.data.results.length) {
      return res.json(response.data.results[0].formatted_address);
    }
    return res.json(response.data.plus_code.compound_code);
  } catch (e) {
    console.log(e);
  }
  return null;
});

router.post('/', async (req, res) => {
  try {
    const response = await googleAPI.get(`/place/autocomplete/json?input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`);
    res.json(response.data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
