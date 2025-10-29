// routes/user.js
const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controllers/userController');

// Định nghĩa routes

// Khi có request GET đến '/', gọi hàm getAllUsers
router.get('/', userController.getAllUsers);

// Khi có request POST đến '/', gọi hàm createUser
router.post('/', userController.createUser);

// Xuất router này ra
module.exports = router;