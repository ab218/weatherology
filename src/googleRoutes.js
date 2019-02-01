require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
  });

  const googleAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/autocomplete',
  });
  
  router.post('/', (req, res) => { 
    console.log('body', req.body)
    googleAPI.get(`/json?input=${req.body.input}&key=${process.env.GOOGLE_API_KEY}`)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        })
    })
  
  module.exports = router;
  