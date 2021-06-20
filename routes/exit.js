const express = require('express');

const exit = require('../controllers/exit');

const router = express.Router();


router.post('/exit', exit);


module.exports = router;