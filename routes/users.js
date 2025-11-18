var express = require('express');
var router = express.Router();

const { signup, login, logout } = require('../controllers/userController');

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
