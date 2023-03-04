const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.post('/signup', authController.signupUser);

module.exports = router;
