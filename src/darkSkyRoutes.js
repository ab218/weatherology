const express = require('express');
const axios = require('axios');

const router = express.Router();

const darkSkyAPI = axios.create({
  baseURL: 'https://api.darksky.net',
});

router.post('/', async (req, res) => { 
  try {
  const forecast = await darkSkyAPI
  .get(`/forecast/${process.env.DARK_SKY_API_KEY}/${req.body.lat},${req.body.lng}`)
  res.json(forecast.data)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
