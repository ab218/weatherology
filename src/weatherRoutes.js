const express = require('express');
const axios = require('axios');

const router = express.Router();

const darkSkyAPI = axios.create({
  baseURL: 'https://api.darksky.net',
});

router.get('/', (req, res) => darkSkyAPI
  .get(`/forecast/${process.env.DARK_SKY_API_KEY}/49.2827,-123.1207`)
  .then(response => res.send(response.data))
  .catch(error => console.error(error)));

module.exports = router;
