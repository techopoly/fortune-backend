const express = require('express');

const createCoin = require('../controllers/createCoin').createCoin;

const router = express.Router();


router.post('/createCoin', createCoin);


module.exports = router;