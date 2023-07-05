const express = require('express');
var router = express.Router();

const customerController = require('../../controllers/customer/index.js');
const { verifyToken } = require('../../utils/middleware.js');

// Customer Form
router.post('/form', customerController.form);

// Customer Get Form
router.get('/getFormData', verifyToken, customerController.getFormData)

//Customer Get Form data using ID
router.get('/getCustomerById/:id', verifyToken, customerController.getCustomerById)

// Customer Statistics
router.get('/statistics', verifyToken, customerController.statistics);

module.exports = router;