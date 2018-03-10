const express = require('express');
const router = express.Router();
const Driver = require('../db/collections/driver');

router.get('/', (req, res) => {
  Driver.find({})
    .populate('driverInfo', 'name company email')
    .populate('occupants', 'name company email')
    .then(driver => {
      res.status(200).send(driver);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  5;
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Driver.find({ _id: id })
    .populate('driverInfo')
    .populate('occupants')
    .then(driver => {
      res.status(200).send(driver);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  let driver = new Driver({
    driverInfo: req.body.driverInfo,
    destinationAddress: req.body.destinationAddress,
    destination: {
      type: 'Point',
      coordinates: [req.body.geoCode.lng, req.body.geoCode.lat]
    },
    time: req.body.time,
    date: req.body.date,
    capacity: req.body.capacity,
    occupants: req.body.occupants,
    carInfo: req.body.carInfo
  });

  driver
    .save()
    .then(driver => {
      res.status(200).send(driver);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.patch('/:id', (req, res) => {
  let id = req.params.id;
  Driver.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .then(driver => {
      res.status(200).send(driver);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.patch('/occupants/:id', (req, res) => {
  let id = req.params.id;
  Driver.findByIdAndUpdate(
    { _id: id },
    { $push: { occupants: req.body.occupants } }
  )
    .then(driver => {
      res.status(200).send('successful');
    })
    .catch(err => [res.status(400).send(err)]);
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Driver.findByIdAndRemove({ _id: id })
    .then(() => {
      res.status(200).send('Successfully deleted');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/filter', (req, res) => {
  Driver.find({
    destination: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [req.body.geoCode.lng, req.body.geoCode.lat]
        },
        $minDistance: 0,
        $maxDistance: parseInt(req.body.maxDistance)
      }
    }
  })
    .then(destinations => {
      return res.status(200).send(destinations);
    })
    .catch(err => {
      return res.status(400).send(err);
    });
});

module.exports = router;
