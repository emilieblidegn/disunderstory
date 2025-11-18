var express = require('express');
const path = require('path');
var router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, dashboardController.renderDashboard);

//router.get('/dashboard', dashboardController.renderDashboard);


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Login-side
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Signup-side
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

//mail test rute 
const { sendEventFinishedMail } = require('../services/mailService');

router.get('/test-mail', async (req, res) => {
  await sendEventFinishedMail("test@example.com", "Test", "Test Event");
  res.send("Test email sent.");
});

module.exports = router;
