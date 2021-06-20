const express = require('express');

const feedController = require('../controllers/test_api');

const router = express.Router();


router.get('/posts', feedController.test_api);
router.post('/createPost', feedController.createPost)

module.exports = router;