const express = require('express');
const router = express.Router();
const User = require('../db/collections/user');

router.get('/', (req, res) => {
  User.find({})
    // .populate('driver')
    // .populate('passenger')
    .then(user => {
      if (!user) {
        return;
      }
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  User.find({ _id: id })
    // .populate('driver')
    // .populate('passenger')
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  let user = new User(req.body);

  user
    .save()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.patch('/:id', (req, res) => {
  let id = req.params.id;

  User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(400).send('No user with that ID found');
      }
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  User.findByIdAndRemove({ _id: id }, (req, res) => {
    res.status(200).send(`Successfully deleted ${id}`);
  }).catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
