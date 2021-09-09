const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// GET /feed/posts
router.get('/posts', userController.getPosts);

// POST /feed/post
router.post('/authenticate', userController.authenticateUser);


router.get('/authenticate', userController.sample);

module.exports = router;