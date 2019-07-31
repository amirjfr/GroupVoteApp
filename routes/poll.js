const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '833741',
    key: 'f1d459f9f15b3865ae7d',
    secret: '3ffa6f03ec4bb2780b55',
    cluster: 'us3',
    encrypted: true
  });

router.get('/', (req, res) => {
    res.send('POLL');
  });

  router.post('/', (req, res) => {
    pusher.trigger('food-poll', 'food-vote', {
        points: 1,
        food: req.body.food
      });
      return res.json({ success: true, message: 'Thank you! Your vote received' });
    });

  module.exports = router;