const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://daniel:mongo@cluster0.cy5m2.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const Device = require('./models/device'); 

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

/**
* @api {get} /api/devices Read a device
* @apiGroup Device
* @apiSuccessExample {json} Successful Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return res.send(devices);
  });
});

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
   return err
     ? res.send(err)
     : res.send(devices);
  });
});

/**
* @api {post} /api/devices Add a new device
* @apiGroup Device
* @apiExample {json} Successful Response:
*    {
*     "Successfully added device and data"
*     }
* @apiParam {String} name The user's name and their device (eg: "Mary's iPhone").
* @apiParam {String} user The user's name (eg: "Mary").
* @apiParam {Number} ts The device's ts number.
* @apiParam {Number} temp The device's temperature.
* @apiParam {Number} lat The device's latitudinal location.
* @apiParam {Number} lon The device's longitudinal location.
* @apiParamExample {json} Example Post:
*  [
*    {
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        }
*      ]
*    }
*  ]
*/

app.post('/api/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post('/api/devices', (req, res) => {
  console.log(req.body);
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});