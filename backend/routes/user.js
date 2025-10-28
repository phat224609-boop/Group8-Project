// D:\...Tnhóm-thu-vi-phat\Group8-Project (backend)\routes\user.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)   // GET /users
    .post(userController.createUser); // POST /users

module.exports = router;