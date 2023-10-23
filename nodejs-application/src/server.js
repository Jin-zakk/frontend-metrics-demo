'use strict';

const express = require('express');

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

const counter1 = new client.Counter({
  name: 'button_1',
  help: 'Count of clicks on the button_1'
});

const counter2 = new client.Counter({
  name: 'button_2',
  help: 'Count of clicks on the button_2'
});

const counter3 = new client.Counter({
  name: 'button_3',
  help: 'Count of clicks on the button_3'
});

const counter4 = new client.Counter({
  name: 'button_4',
  help: 'Count of clicks on the button_4'
});

const app = express();
app.get('/button-click', (req, res) => {
  console.log('button click ', req.query.buttonId)

  switch (req.query.buttonId) {
    case '1':
      counter1.inc();
      break;
    case '2':
      counter2.inc();
      break;
    case '3':
      counter3.inc();
      break;
    case '4':
      counter4.inc();
      break;
    default:
      break;
  }

  res.send('OK')
});

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname })
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);