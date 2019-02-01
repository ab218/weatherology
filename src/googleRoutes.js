require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

  const googleAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place',
  });
  
  router.post('/info', (req, res) => { 
    googleAPI.get(`/findplacefromtext/json?inputtype=textquery&input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => (res.json(response.data.candidates[0].place_id)))
  })

  router.post('/coords', (req, res) => { 
    googleAPI.get(`/details/json?placeid=${req.body.placeid}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => (res.json(response.data)))
  })

  router.post('/', (req, res) => { 
    googleAPI.get(`/autocomplete/json?input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => (res.json(response.data)))
    })

  module.exports = router;
  