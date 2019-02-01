require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => res.send('pong'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const darkSkyRoutes = require('./src/darkSkyRoutes.js');
const googleRoutes = require('./src/googleRoutes.js');

app.use('/api/weather', darkSkyRoutes);
app.use('/api/google', googleRoutes);

app.listen(process.env.PORT || 8080);
console.log('server up on 8080');
