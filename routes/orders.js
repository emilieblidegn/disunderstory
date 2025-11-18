var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');  // sikrer login

router.post('/', auth, orderController.createOrder);

module.exports = router;