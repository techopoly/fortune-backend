const express = require('express');

const getCoinController = require('../controllers/getCoinController');
const getCurrentCoins = require('../controllers/getCurrentCoins');
const enterCoin = require('../controllers/enterCoin');
const exitEnter = require('../controllers/exitEnter');
const getCurrentEnterCoins = require('../controllers/getCurrentEnterCoins');
const getEnterCoin = require('../controllers/getEnterCoin');


const router = express.Router();


router.post('/getCoin', getCoinController);
router.post('/getCurrentCoins', getCurrentCoins);
router.post('/enterCoin', enterCoin);
router.post('/exitEnter', exitEnter);
router.post('/getCurrentEnterCoins', getCurrentEnterCoins);
router.post('/getEnterCoin', getEnterCoin);



module.exports = router;