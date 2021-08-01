const express = require('express');
const router = express.Router();

const moviesController = require('../src/controllers/moviesController');

router.get('/search', moviesController.search);

router.get('/', (req, res, next) => {
  res.status(200).send({ title: 'Movies Home' });
});

module.exports = router;
