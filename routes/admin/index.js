const express = require('express');
var router = express.Router();
const adminController = require('../../controllers/admin/index.js')

// Admin Registration
router.post('/register', adminController.register);

// Admin Login
router.post('/login', adminController.login);

module.exports = router;
